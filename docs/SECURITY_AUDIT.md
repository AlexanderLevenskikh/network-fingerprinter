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

## Runtime critical-transitive patch (#97; separate from authentication #94)

The server-only npm `overrides` and v1 lockfile in this PR pin two
transitive packages to exact, Linux-npm-resolved, integrity-checked versions.
The public API, database layout, capture formats and client bundle are unchanged.

| Transitive runtime package | Previously locked | Candidate locked | Advisory | Status in this PR |
| --- | --- | --- | --- | --- |
| `thenify` (through TypeORM → cli-highlight → mz) | 3.3.0 | **3.3.1** | [GHSA-29xr-v42j-r956](https://github.com/advisories/GHSA-29xr-v42j-r956) (Critical) | No longer flagged in current npm audit |
| `proxy-addr` (through Express) | 2.0.5 | **2.0.8** | [GHSA-jqcg-44mw-7w3h](https://github.com/advisories/GHSA-jqcg-44mw-7w3h) (Critical) | No longer flagged in current npm audit |

`proxy-addr` 2.0.8 additionally requires `forwarded` 0.2.0 (was 0.1.2)
and `ipaddr.js` 1.9.1 (was 1.9.0). All four versions and tarball integrity
values are captured in the server lock. The source-generated npm candidate
installed successfully using Node 24/npm 11.

**npm advisory comparison, exact server/client lock scopes:**

| Domain | Before #97 (total / critical / high) | After #97 (total / critical / high) |
| --- | --- | --- |
| Server production | 44 / 7 / 20 | **42 / 5 / 20** |
| Server including dev/build | 128 / 22 / 44 | **126 / 20 / 44** |
| Client runtime | 18 / 0 / 15 | 18 / 0 / 15 |
| Client including dev/build | 194 / 26 / 68 | 194 / 26 / 68 |

Sources: [before-run 44995942068](https://github.com/AlexanderLevenskikh/network-fingerprinter/actions/runs/44995942068);
[after-run 44996615552](https://github.com/AlexanderLevenskikh/network-fingerprinter/actions/runs/44996615552).
npm audit numbers measure advisories in the lock trees, not demonstrated
exploitability or total distinct CVEs; categories and scopes overlap.

**Dependabot disposition:** legacy PR [#66](https://github.com/AlexanderLevenskikh/network-fingerprinter/pull/66)
proposed `thenify` 3.3.0 → 3.3.1. Its particular package/advisory has
replacement coverage in this PR **only after the new commit is merged and
validated**; coordinator decides closure. The remaining Nest/Express/body-parser/
Multer/qs suggestions (#76, #88, #92, #93) are **not** covered and must stay
open. No blanket security or production-hardening claim is made.

## Issue #95: nonmajor server dependency patch (PR #99, pending full E2E)

The patch retains NestJS 6.7.2 but updates its compatible Express/Multer descendants without a framework-major migration.
It updates `express-session` 1.17.0 → **1.19.0**, overrides `qs` to
**6.17.1**, overrides Express to **4.22.3**, body-parser to **1.20.9** and Multer to **2.5.0**, and refreshes the permitted transitive dependency tree using
`npm audit fix --legacy-peer-deps --package-lock-only --lockfile-version=1`.
The resulting **exact v1 lock** was generated against the official npm registry
on Node 24.22.3, then independently installed with `npm ci` and compiled
with `npm run build` in the temporary Linux workflow. The temporary workflow
was deleted after its artifact was committed. Lock migration changes many
transitive entries (173 existing/added/removed top-level entry names); it is
**not** a framework migration or proof of full safety.

Raw evidence: [master audit #44996722909](https://github.com/AlexanderLevenskikh/network-fingerprinter/actions/runs/44996722909),
[lock/session candidate #44997555909](https://github.com/AlexanderLevenskikh/network-fingerprinter/actions/runs/44997555909)
(artifact `14744880988`),
[nonmajor advisory candidate #44997981819](https://github.com/AlexanderLevenskikh/network-fingerprinter/actions/runs/44997981819)
(artifact `14744019402`), and [HTTP cohort resolver #44998247396](https://github.com/AlexanderLevenskikh/network-fingerprinter/actions/runs/44998247396) (artifact `14744249152`). The first `npm audit fix` attempt without legacy peer
resolution failed with **ERESOLVE**: `@nestjs/elasticsearch@6.0.1` declares
`elasticsearch@^15`, while the app installs `16.5.0`.
The second audit-fix run returns audit exit 1 because findings remain; its
job is green because the output and `npm ci`/TypeScript build were collected,
**not** because the audit was clean.

| Exact lock audit scope | Before #99 (total / critical / high) | #99 candidate (total / critical / high) |
| --- | --- | --- |
| Server production | 42 / 5 / 20 | **9 / 1 / 3** |
| Server including dev/build | 126 / 20 / 44 | **70 / 7 / 15** |
| Client runtime (unchanged) | 18 / 0 / 15 | 18 / 0 / 15 |
| Client including dev/build (unchanged) | 194 / 26 / 68 | 194 / 26 / 68 |

Among the verified paths removed from server production npm audit are
`node_modules/qs`, `node_modules/express-session`, `node_modules/on-headers`,
`node_modules/handlebars`, `node_modules/minimist`,
`node_modules/mkdirp`, `node_modules/optimist`, `node_modules/lodash`,
`node_modules/shelljs`, `node_modules/js-yaml` and `node_modules/node-fetch`.
The HTTP cohort also removes audited paths for `node_modules/express`,
`node_modules/body-parser`, `node_modules/multer`, `node_modules/busboy`,
`node_modules/dicer`, `node_modules/path-to-regexp`,
`node_modules/cookie`, `node_modules/send`,
`node_modules/serve-static` and `node_modules/@nestjs/platform-express`.
Do not infer that all consumers of these packages are safe: this is an exact
audit report for the lock, not a runtime reachability proof.

**Remaining server production advisories require separate migrations:**

* **Critical:** `node_modules/typeorm` (0.2.45) still has SQL-injection advisories
  including GHSA-fx4w-v43j-vc45 and GHSA-q2pj-6v73-8rgj. Advancing to a
  repaired supported TypeORM version requires migration of the existing
  TypeORM/Nest adapter, repositories and PostgreSQL behavior.
* **High:** `node_modules/@nestjs/common`, `node_modules/axios` and
  `node_modules/follow-redirects` remain through the old Nest common HTTP client.
  All remaining high paths still require coordinated Nest common/core migration.
* **Moderate:** `@nestjs/core`, `@nestjs/typeorm`, `passport`,
  `uuid` and `xml2js` remain. No low server production finding remains.

**Legacy PR disposition:** #76's Express 4.18.2 part is superseded by
4.22.3, but its Nest 9 proposal is not. #88's body-parser 2.4.0 major is
**not** installed: body-parser 1.20.9 closes the audited 1.x vulnerabilities,
while its Nest 12 proposal is still outstanding. #92's Multer 2.5.0 installed
path is matched, but its Nest 12 proposal is not; preserve that distinction.
#93's qs 6.17.1 path is matched, but Nest 12 and Jest 30.5.2 are not included;
that PR was already closed when inspected. These are partial/mixed replacement
claims, **not** justification to close #76/#88/#92 wholesale.

The new synthetic regression checks cover session cookie flags, oversized
multipart rejection, malformed JSON and continued authenticated operation.
Until the exact final SHA completes clean Docker/Chromium/Sensor and
Compose/PostgreSQL workflows, **do not merge or claim acceptance**.
