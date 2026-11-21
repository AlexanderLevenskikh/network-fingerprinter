# Network Fingerprinter: unified Docker deployment

The default local profile is exercised in Linux GitHub Actions using synthetic
PCAP samples and an isolated Chromium/Playwright browser. The Analyst image
runs **Node.js 24** (with a compatibility shim for legacy NestJS 6) and pg 8;
the client remains on legacy Webpack 4 and Elasticsearch/Kibana remain on 7.4.1.
This is a validated local demonstration path, **not a production security audit**.
Results depend on a completed successful E2E run of the exact revision being deployed.

## Quick start (Linux, macOS, Windows Docker Desktop)

Requirements: Docker Engine + Compose v2 (Docker Desktop uses Linux containers),
at least 4 GiB available to Docker, and free local ports 3000, 5601, 9200.
On Apple Silicon the 7.4.1 Elasticsearch/Kibana images are
forced to `linux/amd64` and therefore require emulation.

From the repository root, **without creating or editing any files**:

    docker compose --env-file .env.example up -d --build
    docker compose --env-file .env.example ps -a

When running without a copied `.env`, add `--env-file .env.example` to **every**
later `docker compose` command (including logs, ps and down). The examples below
assume a copied `.env` unless explicitly shown otherwise.

The sample credentials are for a **local, disposable demo only**. Everything is
bound to 127.0.0.1 by default; never publish these demo passwords on a LAN or
the Internet. To configure secrets for a persistent installation:

- Linux/macOS: `cp .env.example .env`
- PowerShell: `Copy-Item .env.example .env`

Edit passwords and `SESSION_SECRET` in the new `.env`. It is gitignored. Then use:

    docker compose up -d --build
    docker compose ps -a

Access the UI at http://127.0.0.1:3000 and Kibana at
http://127.0.0.1:5601 (ports configurable in .env). The initial application
account on a **fresh database** is APP_ADMIN_USERNAME / APP_ADMIN_PASSWORD.
PostgreSQL is not published to the host; the application uses the service name
`postgres`. Elasticsearch uses `elasticsearch:9200` on the internal Compose
network. This replaces three hardcoded 192.168.x.x addresses.

## Initialization, dependencies and persistence

- Elasticsearch is healthy only after the authenticated cluster health API
  reaches at least yellow.
- `elastic-init` imports the original `packets-*` index template after that
  healthcheck passes. It must exit with code zero before the analyst starts.
- PostgreSQL initializes its schema and the configured admin on an **empty**
  named volume. An existing database is not overwritten.
- Kibana waits for Elasticsearch and the template; `kibana-init` creates the
  `packets-*` index pattern after Kibana starts serving requests.
- `analyst` waits for a healthy PostgreSQL and Elasticsearch, and a successful
  Elasticsearch initialization. The analyst healthcheck requests `/login`.
- Persistent data uses `elasticsearch-data` and `postgres-data` Docker named
  volumes. No manual mkdir, chmod, or `$PWD/data` mount is needed.

The project is **not yet production-hardened**: the analyst's
existing password verification still uses unsalted MD5, and the stack remains
on Elasticsearch 7.4 and old frontend/backend dependencies. Node 24 alone does
not modernize those dependencies. Network-level authentication is not a substitute for TLS,
RBAC, and modern password hashing.

## Live capture (Linux only, opt-in)

The default Compose command intentionally does not start `sensor`. Capturing
the physical host interface from Docker Desktop on Windows/macOS is not
equivalent to Linux host networking; importing PCAP through the web UI is the
portable path. On Linux, set `SENSOR_INTERFACE` in `.env` to the real host NIC
and then run:

    docker compose --profile capture-linux up -d --build

Sensor uses Linux host network mode with NET_RAW/NET_ADMIN capabilities and
connects to the host-published loopback Elasticsearch port. It is not an
appropriate untrusted multiuser deployment configuration. Capturing traffic
on any network requires proper authorization.

## Diagnostics

    docker compose ps -a
    docker compose logs --tail=100 elasticsearch elastic-init postgres kibana kibana-init analyst
    docker compose --profile capture-linux logs --tail=100 sensor

Check the initialized template:

    docker compose exec elasticsearch curl -fsS -u "elastic:YOUR_ELASTIC_PASSWORD" http://127.0.0.1:9200/_template/packets

For test PCAP import, sign in to the web UI and use its Upload PCAP view.
The synthetic Linux E2E checks authenticate, import 2 matching packets,
0 matching packets, 102 across a historic batch boundary, reject malformed
or absent files with 4xx, and retry after failure; Playwright checks the
browser upload workflow in headless Chromium. These checks do **not** exercise
real user captures, sustained workloads, or live host-interface capture.
Windows Docker Desktop remains a local smoke target, not an independently
validated Windows E2E environment; proxy/image pull issues are host-specific.

Shutdown without losing database data:

    docker compose down

**Destructive, removes both named data volumes and all stored captures/users:**

    docker compose down -v

## Platform/runtime notes

Linux Elasticsearch might require `vm.max_map_count >= 262144` on the host.
Docker Desktop must have sufficient RAM and Linux container support. Changing
`ELK_VERSION` alone is **not supported**: Elasticsearch, Kibana, Python and
Node clients must be verified together. Likewise, the PostgreSQL
major version and old populated PostgreSQL volumes must not be upgraded by
just switching a tag; migrate or back up data explicitly.
