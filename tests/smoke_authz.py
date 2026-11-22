#!/usr/bin/env python3
"""Synthetic administrator/regular-user session authorization E2E; no production data."""
import http.cookiejar
import json
import os
import subprocess
import urllib.error
import urllib.parse
import urllib.request

BASE = "http://127.0.0.1:3000"
ADMIN = os.environ.get("APP_ADMIN_USERNAME", "admin")
PASSWORD = os.environ["APP_ADMIN_PASSWORD"]
FIXTURE_USER = "authz-fixture-only"
FIXTURE_PASSWORD = "synthetic-user-password-only"


def session():
    jar = http.cookiejar.CookieJar()
    return urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))


def request(opener, path, data=None, method=None, content_type=None):
    headers = {"Content-Type": content_type} if content_type else {}
    req = urllib.request.Request(BASE + path, data=data, method=method, headers=headers)
    try:
        with opener.open(req, timeout=20) as res:
            return res.status, res.read()
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read()


def login(opener, username, password):
    payload = urllib.parse.urlencode({"username": username, "password": password}).encode()
    status, _ = request(opener, "/api/auth/login", payload, content_type="application/x-www-form-urlencoded")
    assert status == 200, ("login", status)


def postgres(sql):
    result = subprocess.run(
        ["docker", "compose", "--env-file", ".env.example", "exec", "-T", "postgres",
         "psql", "-v", "ON_ERROR_STOP=1", "-U", "fingerprinter", "-d", "analytics", "-Atc", sql],
        check=True, capture_output=True, text=True,
    )
    return result.stdout.strip()


admin = session()
login(admin, ADMIN, PASSWORD)
status, body = request(admin, "/api/user/list")
assert status == 200, ("administrator list", status, body[:200])
registration = json.dumps({
    "userName": FIXTURE_USER, "password": FIXTURE_PASSWORD,
    "isAdmin": False, "firstName": "Fixture",
}).encode()
status, body = request(admin, "/api/user/register", registration, method="POST", content_type="application/json")
assert status == 201, ("admin registration", status, body[:200])
print("PASS administrator can manage synthetic users")

ordinary = session()
login(ordinary, FIXTURE_USER, FIXTURE_PASSWORD)
status, body = request(ordinary, "/api/user/list")
assert status == 403, ("non-admin list", status, body[:200])
for path, method, data in (
    ("/api/user/register", "POST", registration),
    ("/api/user/remove?userId=00000000-0000-0000-0000-000000000000", "DELETE", None),
):
    status, body = request(ordinary, path, data, method=method,
                           content_type="application/json" if data else None)
    assert status == 403, (method, path, status, body[:200])
print("PASS non-admin forbidden with true HTTP 403")

current_status, body = request(ordinary, "/api/user/current")
view = json.loads(body)
assert current_status == 200 and view["isAdmin"] is False, (current_status, view)
assert "passwordHash" not in view and "passwordhash" not in view, view
print("PASS public user view omits password hash")

assert postgres("UPDATE user_entity SET isadmin = true WHERE username = 'authz-fixture-only' RETURNING isadmin;") == "t"
status, _ = request(ordinary, "/api/user/list")
assert status == 200, ("newly elevated role", status)
assert postgres("UPDATE user_entity SET isadmin = false WHERE username = 'authz-fixture-only' RETURNING isadmin;") == "f"
status, body = request(ordinary, "/api/user/list")
assert status == 403, ("revoked role in existing session", status, body[:200])
print("PASS role elevation and revocation visible in an existing Passport session")
