# Analyst security baseline and dependency follow-up (2026-11-22)

This page accompanies the separate bilingual README work in draft PR #87. It is **not** a claim that the application or its supply chain is vulnerability-free.

## Authentication change in the security hardening branch

* The server no longer creates an implicit `root/root` administrator when its user table is empty. For a clean Docker Compose volume, configure `APP_ADMIN_USERNAME` and `APP_ADMIN_PASSWORD`; PostgreSQL's existing first-start bootstrap creates this account.
* Newly registered accounts use versioned, randomly salted Node.js scrypt password hashes. Existing 32-character MD5 credentials can still log in and are conditionally rehashed after a successful authentication. The `user_entity.passwordhash` VARCHAR(255) schema is unchanged. The bootstrap SQL still initially inserts an MD5 hash, which is migrated on the first successful login; operators should treat any not-yet-migrated legacy hashes as an outstanding risk.
* Synthetic Jest tests verify modern hash round-trips, incorrect passwords and legacy MD5 acceptance. Linux E2E is extended to inspect PostgreSQL after login, with no password or hash in output.
* User list, registration and removal endpoints now reject authenticated non-administrators (403). Existing sessions serialize role claims and are not immediately revoked if an administrator changes a role; moving to ID-only sessions with per-request role lookup remains a separate follow-up.
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

Next bounded patch: upgrade the vulnerable Nest/Express/Multer runtime cohort as a separately tested compatibility migration, then address browser bundle and Webpack 4 tools. Re-run npm audits and the full Docker/Chromium, Compose/PostgreSQL and optional Sensor suites for each candidate.
