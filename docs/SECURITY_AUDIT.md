# Analyst security baseline and dependency follow-up (2026-11-22)

This page accompanies the separate bilingual README work in draft PR #87. It is **not** a claim that the application or its supply chain is vulnerability-free.

## Authentication change in the security hardening branch

* The server no longer creates an implicit `root/root` administrator. On clean Compose volumes, PostgreSQL creates the schema only; Analyst seeds the configured `APP_ADMIN_USERNAME` / `APP_ADMIN_PASSWORD` with scrypt-v2 at startup. Existing database users are not reset.
* New passwords use asynchronous, randomly salted scrypt-v2 (`N=131072, r=8, p=1`, maxmem=256 MiB, 64-byte output) with one active KDF and at most four waiters per Analyst process. Valid historical MD5 and the previous scrypt-v1 login hashes migrate on successful authentication without changing `user_entity.passwordhash VARCHAR(255)`; incorrect credentials do not change stored hashes. Historical `root/root` MD5 credentials are *blocked* until an operator resets that account. This is a bounded local worker-pool limit, not an IP-based login rate limiter.
* Synthetic Jest and HTTP E2E verify scrypt, legacy hashes, failed logins, first-run Postgres hash, and administrator versus ordinary-user access. The administrative session contains only the user ID; each authenticated request reloads current role data from the database and excludes stored hashes.
* User list, registration and removal reject non-administrators (HTTP 403, not a redirect). Existing sessions serialize only user IDs and reload current roles on every request; demotion is effective without a new login.
* Session cookies now explicitly use HttpOnly and SameSite=Lax. The current in-process `express-session` MemoryStore is **not** a production-grade persistent session store. External deployment requires TLS, reviewed reverse-proxy trust and session persistence/rotation design.

## Lockfile inventory on master 4dd6ad6f3a9043cbb67600ef7931ca182149f0bd

The server uses npm lockfile v1 (804 top-level lock entries); client uses lockfile v3 (1,512 package path entries). Counts describe **lock entries, not security advisories**. Examples of precisely locked versions:

| Package | server lock | client lock | Exposure |
| --- | --- | --- | --- |
| @nestjs/core / platform-express | 6.7.2 / 6.7.2 | — | server runtime |
| express | 4.17.1 | 4.17.1 | server runtime; client build/dev dependency subtree |
| body-parser | 1.19.0 | 1.19.0 | server runtime; client build tooling |
| multer | 1.4.2 | — | server upload endpoint |
| qs | 6.7.0 | 6.9.1 plus nested 6.7.0 / 6.5.2 | runtime and transitive tools |
| lodash | 4.17.15 | 4.17.15 | server / tooling paths |
| webpack | 4.41.0 | 4.47.0 | build tools |
| html-webpack-plugin | — | 3.2.0 | client build tool |
| React | — | 16.12.0 | browser runtime |

The Dockerfile performs `npm ci` and production Webpack/TypeScript builds, so build-only advisories cannot be dismissed without checking the emitted browser bundle and build execution. The lockfile entries above are not an exhaustive advisory list.

## Reproducing the advisory audit

The non-blocking `Analyst dependency advisory inventory` GitHub Actions workflow saves raw npm reports and error statuses as a downloadable evidence artifact. For a local run using Node 24/npm:

```sh
cd analyst-app/server
npm audit --json --omit=dev > server-prod.json
npm audit --json > server-all.json
cd ../client
npm audit --json --omit=dev > client-runtime.json
npm audit --json > client-all.json
```

Audit results rely on the advisory registry's availability and current matching rules; an HTTP or CLI failure is **not** zero findings. Client `--omit=dev` is only a dependency classification, not proof that code from dev dependencies cannot reach a shipped bundle. Supply-chain severity, production reachability and remediation must be reviewed separately.

## Dependabot disposition

Do not merge or close existing Dependabot PRs without exact current-lock verification and a fixing commit or an explicit replacement issue with full coverage. In particular:

* #88, #92 and #93 concern server runtime body-parser / multer / qs / Nest platform: **not resolved** by password-hardening changes.
* #70 and #78 propose html-webpack-plugin 5 with the Webpack 4 baseline: isolate compatibility work and test generated bundles.
* #76 and #88 traverse multiple Nest generations; #77 proposes Nest CLI restructuring. Treat each as a separate compatibility migration, not an auto-merge.
* #91 and other build-tool PRs remain open pending complete installed/bundled dependency assessment.

## Recover an existing administrator without deleting data

When an account is stuck at historical `root/root` or the administrator has forgotten the password, use the targeted recovery command **only for an existing admin**. In the root of the repository, on a trusted operator terminal (Linux/macOS Bash):

```sh
read -rsp 'New administrator password: ' NF_RESET_PASSWORD; echo
printf '%s\n' "$NF_RESET_PASSWORD" | docker compose --env-file .env.example exec -T analyst node -r ./node24-compat.cjs scripts/reset-admin.cjs root
unset NF_RESET_PASSWORD
```

Replace `root` with the actual existing administrator username when appropriate. The command performs a checked, transactional update on exactly one existing admin account; it never resets other users or clears PostgreSQL. Use a strong unique password and protect the operator terminal. The password remains briefly in shell memory; avoid command-line arguments, shell history and CI log output.

## Remaining operational limits

Local Compose uses HTTP on loopback, is not internet-hardened, and has no shared session store. Add TLS and reviewed reverse proxy, request-rate limits, durable session storage, CSRF policy and role-scoped credentials before external exposure. OWASP recommends scrypt `N=2^17,r=8,p=1`; this is used in v2. [OWASP password guidance](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) and [Node.js 24 crypto](https://nodejs.org/download/release/v24.21.0/docs/api/crypto.html).

Next bounded patch: upgrade the vulnerable Nest/Express/Multer runtime cohort as a separately tested compatibility migration, then address browser bundle and Webpack 4 tools. Re-run npm audits and the full Docker/Chromium, Compose/PostgreSQL and optional Sensor suites for each candidate.
