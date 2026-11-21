#!/usr/bin/env python3
"""Synthetic-only Analyst smoke: no capture interface, no external targets."""
import http.cookiejar
import json
import os
import socket
import struct
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from pathlib import Path

BASE = "http://127.0.0.1:3000"
SRC, DST = "192.0.2.10", "198.51.100.20"  # RFC 5737 TEST-NET only
USER = os.environ.get("APP_ADMIN_USERNAME", "admin")
PASSWORD = os.environ["APP_ADMIN_PASSWORD"]


def checksum(data):
    if len(data) % 2:
        data += b"\x00"
    total = sum(struct.unpack("!" + "H" * (len(data) // 2), data))
    while total >> 16:
        total = (total & 65535) + (total >> 16)
    return (~total) & 65535


def packet(source, dest, source_port, dest_port, flags, seq, ack):
    s, d = socket.inet_aton(source), socket.inet_aton(dest)
    tcp = struct.pack("!HHIIHHHH", source_port, dest_port, seq, ack, (5 << 12) | flags, 64240, 0, 0)
    pseudo = s + d + struct.pack("!BBH", 0, 6, len(tcp))
    tcp = tcp[:16] + struct.pack("!H", checksum(pseudo + tcp)) + tcp[18:]
    ip = struct.pack("!BBHHHBBH4s4s", 0x45, 0, 40, 1, 0x4000, 64, 6, 0, s, d)
    ip = ip[:10] + struct.pack("!H", checksum(ip)) + ip[12:]
    eth = bytes.fromhex("0200000000020200000000010800")
    return eth + ip + tcp


def pcap_bytes():
    packets = [
        packet(SRC, DST, 54321, 443, 2, 100, 0),
        packet(DST, SRC, 443, 54321, 18, 200, 101),
    ]
    out = bytearray(struct.pack("<IHHIIII", 0xA1B2C3D4, 2, 4, 0, 0, 65535, 1))
    for i, payload in enumerate(packets):
        out += struct.pack("<IIII", 1700000000, i * 100000, len(payload), len(payload))
        out += payload
    return bytes(out)


jar = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))


def request(path, data=None, headers=None, timeout=15):
    req = urllib.request.Request(BASE + path, data=data, headers=headers or {})
    with opener.open(req, timeout=timeout) as response:
        return response.status, response.url, response.read()


deadline = time.monotonic() + 180
while True:
    try:
        status, _, page = request("/login", timeout=5)
        if status == 200 and len(page) > 100:
            print("PASS Analyst login page HTTP 200")
            break
    except (OSError, urllib.error.URLError):
        pass
    if time.monotonic() >= deadline:
        raise RuntimeError("Analyst page did not become available in 180 seconds")
    time.sleep(3)

body = urllib.parse.urlencode({"username": USER, "password": PASSWORD}).encode()
status, url, _ = request("/api/auth/login", body, {"Content-Type": "application/x-www-form-urlencoded"})
if status != 200 or url.rstrip("/") != BASE:
    raise RuntimeError("Login did not redirect to authenticated app")
print("PASS authenticated login")

boundary = "nf-" + uuid.uuid4().hex
capture = pcap_bytes()
payload = (
    ("--" + boundary + "\r\nContent-Disposition: form-data; name=\"file\"; filename=\"synthetic.pcap\"\r\n"
     "Content-Type: application/vnd.tcpdump.pcap\r\n\r\n").encode()
    + capture + ("\r\n--" + boundary + "--\r\n").encode()
)
status, _, response = request("/api/player/upload", payload, {"Content-Type": "multipart/form-data; boundary=" + boundary}, timeout=120)
if status < 200 or status >= 300:
    raise RuntimeError("PCAP upload returned non-success status")
print("PASS synthetic PCAP upload API")

deadline = time.monotonic() + 90
while True:
    status, _, data = request("/api/stream/tcp/list?current=1&take=20")
    try:
        parsed = json.loads(data)
        streams = parsed["streams"]
    except (ValueError, KeyError, TypeError) as exc:
        raise RuntimeError("Invalid TCP stream API response") from exc
    matched = [s for s in streams if s.get("sourceIp") == SRC and s.get("destinationIp") == DST
               and str(s.get("sourcePort")) == "54321" and str(s.get("destinationPort")) == "443"]
    if matched:
        print("PASS SYN/SYN-ACK visible as TCP stream with correct endpoint IPs and ports")
        break
    if time.monotonic() >= deadline:
        raise RuntimeError("Synthetic TCP stream did not appear in Analyst API")
    time.sleep(3)

# A malformed PCAP must not produce a successful import response.
bad_boundary = "nf-" + uuid.uuid4().hex
bad_payload = (
    ("--" + bad_boundary + "\\r\\nContent-Disposition: form-data; name=\\"file\\"; filename=\\"invalid.pcap\\"\\r\\n"
     "Content-Type: application/vnd.tcpdump.pcap\\r\\n\\r\\n").replace("\\r", "\r").replace("\\n", "\n").encode()
    + b"not a pcap"
    + ("\\r\\n--" + bad_boundary + "--\\r\\n").replace("\\r", "\r").replace("\\n", "\n").encode()
)
try:
    request("/api/player/upload", bad_payload,
            {"Content-Type": "multipart/form-data; boundary=" + bad_boundary}, timeout=30)
except urllib.error.HTTPError as exc:
    if exc.code < 400:
        raise RuntimeError("Invalid PCAP was accepted")
    print("PASS malformed PCAP import fails with HTTP", exc.code)
else:
    raise RuntimeError("Invalid PCAP import was reported as successful")
