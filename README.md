# Network Fingerprinter

**Passive network traffic fingerprinting, with a local PCAP-to-results workflow.**

[English](README.md) · [Русский](README.ru.md) · [Docker guide](docs/docker.md) · [PCAP import details](docs/pcap-import.md)

Network Fingerprinter extracts selected TCP, TLS and HTTP observations to help inspect TCP flows and their OS/application fingerprints. It consists of an optional **Sensor** (selective TShark capture/export), an **Elasticsearch 8 Collector**, and a browser-based **Analyst** for importing captures, viewing streams and exploring statistics. **You do not need live capture to try it.**

> **November 2026 refresh:** the local stack now uses one root Docker Compose configuration, Elasticsearch/Kibana **8.19.25**, PostgreSQL **16.16**, and an Analyst runtime on **Node.js 24**. This is a local demonstration, not a production-hardened or security-audited deployment.

## First result: import a PCAP

Prerequisites: Docker Engine with Compose v2 (or Docker Desktop with **Linux containers**), at least **4 GiB** available to Docker, and free local ports **3000**, **5601**, and **9200**.

1. Clone the repository, open a terminal in its root and start the default stack. No separate module Compose files or manual database setup are needed:

   ```sh
   git clone https://github.com/AlexanderLevenskikh/network-fingerprinter.git
   cd network-fingerprinter
   docker compose --env-file .env.example up -d --build
   docker compose --env-file .env.example ps -a
   ```

2. Wait until `analyst`, `postgres`, `elasticsearch` and `kibana` are healthy and the one-shot `elastic-init` and `kibana-init` jobs have completed successfully. Open **[Analyst](http://127.0.0.1:3000)**. On a *fresh* PostgreSQL volume, sign in with username **`admin`** and password **`local-admin-change-me`** from [`.env.example`](.env.example).
3. Open the **Player / PCAP upload** screen, select or drop a **PCAP** capture (up to **10 MiB per file**) containing TCP SYN/SYN-ACK, TLS ClientHello or HTTP messages. The UI reports **processing**, **indexed packet count**, **no matching packets (0)** or **error** separately for each file. A failed upload can be retried; there is no persistent import history.
4. Open **TCP streams** to see the imported connections, addresses and available fingerprints. Use **Statistics** for aggregate client/server views. A valid capture with no relevant packets imports successfully but creates no matching stream; an invalid capture displays an error rather than a false success.

**No PCAP handy?** On Linux/macOS with Python 3, after the stack is healthy you can run the repository's **synthetic-only smoke** from the root:

```sh
APP_ADMIN_PASSWORD=local-admin-change-me python3 tests/smoke_analyst.py
```

In PowerShell: `$env:APP_ADMIN_PASSWORD='local-admin-change-me'; python tests/smoke_analyst.py`. The script **also imports synthetic packets into your local demo** (2 matching SYN/SYN-ACK packets, a 102-packet boundary case, a 0-match case and error/retry checks) and writes `tests/browser_retry.pcap`; open **Player / PCAP upload** and select that generated file to observe a fresh per-file result, then view **TCP streams**. The synthetic source/destination addresses are documentation-only TEST-NET ranges, not real hosts. The workflow is exercised by [Linux E2E](.github/workflows/analyst-e2e.yml); Windows execution of this Python command is not independently E2E-verified. For other files, only use captures you are authorized to analyze. See [import API semantics](docs/pcap-import.md).

The sample passwords and HTTP endpoints are **loopback-only demo defaults**. Never expose them to a LAN or the Internet. For a persistent **local** installation, copy `.env.example` to gitignored `.env`, change **all** example passwords and `SESSION_SECRET`, and use `docker compose up -d --build` instead. Initial admin credentials apply only when the PostgreSQL volume is empty.

## What runs where?

| Component | Role | Default access |
| --- | --- | --- |
| **Analyst** | Sign-in, PCAP upload, TCP streams and statistics | [127.0.0.1:3000](http://127.0.0.1:3000) |
| **Collector** | Elasticsearch 8.19.25 packet indices; Kibana 8.19.25 data view `packets-*` | [Kibana 127.0.0.1:5601](http://127.0.0.1:5601); ES `127.0.0.1:9200` |
| **Sensor** (optional) | Selectively captures SYN/SYN-ACK, TLS ClientHello and HTTP observations into Elasticsearch | **Linux host capture only**, `capture-linux` profile |

The default Compose profile starts **without Sensor**, which makes importing existing captures the portable path on Linux, Windows Docker Desktop and macOS Docker Desktop. Live capture is an **opt-in Linux-only** workflow requiring a real `SENSOR_INTERFACE`, proper permissions and explicit authorization; Docker Desktop's VM networking does not provide equivalent physical-interface capture. See [Linux sensor setup](docs/docker.md#live-capture-linux-only-opt-in).

## Data, compatibility and limitations

- Named volumes: **`elasticsearch-data-v8`** and **`postgres-data`**. ES8 uses a **separate new volume**, not the old ES7 `elasticsearch-data` volume. **No ES7→ES8 migration is implemented.** Existing `.env` files may lack newer Kibana secrets; compare them with [`.env.example`](.env.example) before starting. Do not point ES8 at ES7 data or remove volumes containing data you need.
- **Linux GitHub Actions** validates the default Compose/PG setup, Analyst API, real headless Chromium PCAP upload, and **synthetic** offline Sensor→ES8 indexing. Windows Docker Desktop is a local smoke target (image pulls may be affected by the host proxy), **not** an independently passed Windows E2E; macOS is not independently E2E-verified. Actual physical-interface capture, high traffic, production security and migration of historic data are **not** established.
- The Analyst runs on Node 24 with compatibility code for legacy NestJS 6; the frontend still includes legacy Webpack 4 and password hashing is not production-grade. **Do not treat the upgraded runtime as a security certification.**

For diagnostics, environment variables, bootstrap order, persistence, backup cautions and shutdown (including the **destructive** `down -v` distinction), use the [Docker operations guide](docs/docker.md). For import limits, HTTP responses and partial-indexing behavior, use the [PCAP import guide](docs/pcap-import.md). [Issues](https://github.com/AlexanderLevenskikh/network-fingerprinter/issues) · [CI runs](https://github.com/AlexanderLevenskikh/network-fingerprinter/actions).

## License

[Apache License 2.0](LICENSE).
