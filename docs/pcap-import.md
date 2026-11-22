## PCAP import (Analyst / Player)

On the Player screen, select or drag one or more PCAP files. Each file has its
own live status: processing, indexed packet count, no matching packets (0),
or an error. The selection stays available after an error; there is no history.

The existing authenticated \`POST /api/player/upload\` accepts one multipart
field named \`file\` per request, maximum **10 MiB (10,485,760 bytes)** per file.
The limit is enforced by the server's multipart middleware and checked again
by the import service. Missing/empty input or malformed PCAP returns a
non-success 4xx response with a message. A valid file with no SYN, TLS
ClientHello, or HTTP request/response packets returns HTTP 201:

\`\`\`json
{"status":"no_matches","indexedPackets":0}
\`\`\`

A complete successful import returns HTTP 201:

\`\`\`json
{"status":"indexed","indexedPackets":2}
\`\`\`

Counts are confirmed Elasticsearch bulk item successes, not merely the number
of packets read by tshark. A failure never returns a success result. Bulk
writes are **not atomic** across chunks: on failure after previous chunks
were indexed, HTTP 500 carries \`indexedPackets\` for those completed chunks.
The caller must not treat that as a successful full import. The importer uses
a private temporary directory per request, always removes it and runs chunk
subprocesses sequentially. Uploads from separate requests can run concurrently.
