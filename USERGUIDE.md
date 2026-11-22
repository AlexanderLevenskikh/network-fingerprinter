# Network Fingerprinter — User Guide

[English](USERGUIDE.md) · [Русский](USERGUIDE.ru.md) · [Project overview](README.md) · [Docker operations](docs/docker.md)

This is a walkthrough of the **local, passive traffic-analysis demo**: sign in, import an existing PCAP, inspect TCP streams, and understand the available TCP/TLS/HTTP fingerprints. **The default setup does not sniff your network.** You do not need a physical network interface, Kibana knowledge, or production traffic to try it.

> **Scope and safety:** Use only PCAPs and network interfaces you are authorized to inspect. This is a loopback-only demo, not a production-hardened monitoring appliance. Importing a PCAP writes packet observations to persistent Elasticsearch storage.

## 1. Requirements and launch

- Docker Engine + Compose v2. On Windows/macOS use Docker Desktop with **Linux containers**; Linux is the primary CI-tested host.
- At least **4 GiB** of RAM available to Docker. Ports **3000**, **5601**, **9200** must be free on your computer.
- Git to clone the code. Python 3 is optional and needed only for generating the synthetic sample.

In a shell (PowerShell, Bash, or similar):

~~~sh
git clone https://github.com/AlexanderLevenskikh/network-fingerprinter.git
cd network-fingerprinter
docker compose --env-file .env.example up -d --build
docker compose --env-file .env.example ps -a
~~~

Wait for `analyst`, `postgres`, `elasticsearch`, and `kibana` to report **healthy**. The one-shot `elastic-init` and `kibana-init` services should have **exited successfully (0)**, rather than staying up. First image downloads and Elasticsearch startup can take time. If anything is unhealthy, see [Troubleshooting](#7-troubleshooting).

This command uses **example credentials** without writing a local configuration. Add `--env-file .env.example` to **every later Compose command** in this mode.

For a *persistent local* setup, first copy `.env.example` to the gitignored `.env` (`Copy-Item .env.example .env` in PowerShell; `cp .env.example .env` in Bash), change **all** sample passwords and `SESSION_SECRET`, then run `docker compose up -d --build`. Do this **before** the first boot on a new database: changing `APP_ADMIN_PASSWORD` later does not reset an existing user.

## 2. Sign in

Open **http://127.0.0.1:3000** in your browser. On a **fresh** PostgreSQL volume with the example environment:

| Field | Demo value |
| --- | --- |
| Login | `admin` |
| Password | `local-admin-change-me` |

These credentials are for local testing only. There is **no default `root/root` login**. With an existing PostgreSQL volume, use the account already in the database; see [administrator recovery](docs/SECURITY_AUDIT.md#recover-an-existing-administrator-without-deleting-data) if you no longer know its password.

The header menu has **Upload *.pcap**, **Streams**, and **Statistics** (by clients / by servers). Only administrators may register or remove users. Regular users cannot use the user-management endpoints.

## 3. Import a PCAP

1. Select **Upload *.pcap** (the Player screen).
2. Drag one or several `.pcap` files into the drop area, or click to choose files. The limit is **10 MiB per file**, not per batch.
3. Check the **result beside each file**. Each upload is independent:

   | Message | Meaning |
   | --- | --- |
   | **Processing…** | Uploading and decoding; not yet complete |
   | **Indexed packets: N** | Successful Elasticsearch item writes were counted |
   | **Valid file; no matching packets** | Import succeeded but none of the selected packet types matched; no new stream expected |
   | **Import failed: …** | Bad/empty/oversized PCAP, server or network error; not a successful import |

The importer selects observations such as **TCP SYN/SYN-ACK**, **TLS ClientHello**, and **HTTP request/response**. It does not index every packet in a capture. A malformed file or file over the limit is rejected rather than silently treated as an empty capture. After an error, you can choose another file; the drop area remains usable.

There is **no persistent upload-history page**. Imported packet observations **do** persist in Elasticsearch; importing a capture again can produce additional stored observations. Bulk indexing across chunks is **not transactional**: a server error after some successful chunks may have already persisted part of the capture. See [PCAP import contract](docs/pcap-import.md).

### No PCAP? Create a synthetic example

After the stack is healthy, run from the repository root (this also **imports synthetic test data** into your running demo):

~~~sh
APP_ADMIN_PASSWORD=local-admin-change-me python3 tests/smoke_analyst.py
~~~

PowerShell:

~~~powershell
$env:APP_ADMIN_PASSWORD = 'local-admin-change-me'
python tests/smoke_analyst.py
~~~

Use your configured admin password instead of the demo value if you customized `.env`. The script writes **`tests/browser_retry.pcap`**, which you can then import in the browser. Its test traffic uses reserved documentation address ranges; it does not capture live packets. The smoke covers 2 matching packets, a 102-packet boundary scenario, a valid zero-match case, and error/retry behavior. Linux CI exercises this; Windows PowerShell execution is provided as a convenience, **not** separately claimed as Windows E2E.

## 4. Inspect TCP streams

Open **Streams** after a successful import. The table displays available **start/end time**, **source/destination addresses** (MAC, IP, port), **packet count**, **application-layer protocols**, **SNI when present**, **sensor ID**, and **fingerprint** information. You can filter by date range and source/destination IP, MAC, or port, then select **Search**.

One source PCAP is decoded in one TShark pass, preserving distinct `tcp.stream` identities across internal indexing chunks. Do **not** interpret the number of matching observations as the total PCAP packet count.

A missing fingerprint may appear as **Undefined**. Passive fingerprints are evidence/inference, **not guaranteed identification** of an operating system or application. An empty Streams table after a zero-match upload is expected; for a matching upload, first check the date/IP filters before assuming import failed.

## 5. Explore statistics

Choose **Statistics → By clients** or **By servers**. Select a client/server entry to inspect the available **TCP, TLS, and HTTP fingerprints** and linked streams. Some entries may show **Undefined** or **Multiple matches found**. The feature summarizes stored observations; it is not an active scanner or a guarantee of exact OS/software versions.

Optional: **Kibana** is at **http://127.0.0.1:5601** and has a `packets-*` data view initialized by Compose. It is an inspection tool, **not required** for the normal browser walkthrough; Kibana uses its own Elasticsearch authentication, not your Analyst login.

## 6. Optional live Sensor — Linux only

The default Compose profile does not start Sensor. On a **Linux host only**, make a local `.env` from `.env.example`, set `SENSOR_INTERFACE` to a real permitted host interface (e.g. the actual device reported by `ip link`), set fresh secrets, and run:

~~~sh
docker compose --profile capture-linux up -d --build
docker compose --profile capture-linux logs --tail=100 sensor
~~~

Sensor uses host networking and `NET_RAW`/`NET_ADMIN` capabilities and exports selected observations to Elasticsearch. Docker Desktop on Windows/macOS does **not** provide equivalent access to your host's physical NIC. The Linux CI sensor test is **synthetic indexing**, not proof of real physical-interface capture. For cross-platform use, stick to the PCAP upload path.

## 7. Troubleshooting

| Symptom | Check / next action |
| --- | --- |
| Analyst login page not available | `docker compose --env-file .env.example ps -a`; then `docker compose --env-file .env.example logs --tail=100 analyst postgres elasticsearch kibana elastic-init kibana-init` |
| Elasticsearch unhealthy or exits | Docker RAM, Linux host `vm.max_map_count >= 262144`, volume permissions, Elasticsearch logs |
| Address/port already in use | Ports 3000/5601/9200; change corresponding `*_PORT` in a local `.env` and browse the new Analyst port |
| Images fail to pull on Windows | Verify Docker Desktop Linux-container mode and your host's network/proxy; this is not evidence of an application failure |
| Demo `admin` login fails | Existing `postgres-data` volume may have different credentials; changing the environment variable does **not** overwrite the user |
| HTTP 403 on user management | Expected for a non-admin user. Ask an administrator to manage accounts |
| PCAP reports 0 matches | Capture is valid but does not contain the selected TCP/TLS/HTTP observations; retry with the synthetic example |
| Upload returns an error | Check file is a valid `.pcap`, below 10 MiB; inspect Analyst logs. Some earlier chunks may have indexed if a later bulk write failed |
| Stream seems absent | Check Streams filters/date range, verify a positive indexed count and allow backend indexing to finish |

If using a copied `.env`, omit `--env-file .env.example` from commands above. Prefer reading [Docker operations](docs/docker.md), [PCAP API semantics](docs/pcap-import.md), and [security status](docs/SECURITY_AUDIT.md) before attempting manual recovery.

## 8. Stop or retain data

~~~sh
docker compose --env-file .env.example down
~~~

This stops the demo **without deleting its named volumes** (`postgres-data` and `elasticsearch-data-v8`). **Do not run `docker compose down -v` unless you intentionally want to destroy saved users and indexed packet data.** No Elasticsearch 7 → 8 volume migration is provided.

## Platform and security boundary

The clean Linux Actions workflow tests Compose/PostgreSQL, Analyst API, a real headless Chromium upload, and offline synthetic Sensor→Elasticsearch indexing. Windows/macOS with Docker Desktop are documented launch options, **not equivalent independent end-to-end validations**. No live-interface capture, historical ES7 migration, high-load behavior or production security is certified. Server dependency remediation is ongoing (including a critical TypeORM path and Nest/Axios issues); the browser build also retains legacy dependencies. Keep default services on loopback and **never expose the example credentials or HTTP stack to the Internet**.

**Repository:** [AlexanderLevenskikh/network-fingerprinter](https://github.com/AlexanderLevenskikh/network-fingerprinter) · **Design family:** [Levencode Labs](https://github.com/levencode-labs) · **License:** [Apache-2.0](LICENSE).
