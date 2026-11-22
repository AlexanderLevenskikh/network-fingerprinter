"""Synthetic offline tshark -> real Elasticsearch 8 integration, no host capture."""
import os
import socket
import struct
import subprocess
import tempfile
import time
from pathlib import Path

from elasticsearch import Elasticsearch
from delivery import deliver_packets
from tshark import decode_ek


def synthetic_pcap(path):
    eth = bytes.fromhex("aabbccddeeff1122334455660800")
    ip = struct.pack("!BBHHHBBH4s4s", 0x45, 0, 40, 0, 0, 64, 6, 0,
                     socket.inet_aton("192.0.2.10"), socket.inet_aton("198.51.100.20"))
    tcp = struct.pack("!HHIIBBHHH", 12345, 443, 1, 0, 0x50, 0x02, 65535, 0, 0)
    pkt = eth + ip + tcp
    path.write_bytes(struct.pack("<IHHIIII", 0xA1B2C3D4, 2, 4, 0, 0, 65535, 1)
                     + struct.pack("<IIII", 1767225600, 0, len(pkt), len(pkt)) + pkt)


client = Elasticsearch(
    "http://" + os.environ.get("ELASTIC_HOST", "127.0.0.1:9200"),
    basic_auth=(os.environ["ELASTIC_USERNAME"], os.environ["ELASTIC_PASSWORD"]),
    request_timeout=10,
)
with tempfile.TemporaryDirectory() as tmp:
    file = Path(tmp) / "sensor-test.pcap"
    synthetic_pcap(file)
    process = subprocess.run(["/usr/bin/tshark", "-r", str(file), "-T", "ek", "-n",
                              "-Y", "tcp.flags.syn == 1"],
                             check=True, capture_output=True, text=True, timeout=20)
    rows = list(decode_ek(process.stdout.splitlines(), "ci", "sensor-ci"))
    assert len(rows) == 1, "tshark did not produce the synthetic SYN"
    for row in rows:
        row["timestamp"] = "1767225600000"
    idx = "packets-2026-01-01"

    def matching():
        client.indices.refresh(index=idx, ignore_unavailable=True)
        if not client.indices.exists(index=idx):
            return 0
        response = client.search(index=idx, size=10, query={"match_all": {}})
        return sum(1 for hit in response["hits"]["hits"]
                   if hit["_source"].get("sensorId") == "sensor-ci")

    def slowly_produced_packets():
        yield dict(rows[0])
        # Producer is still inside the generator: a full-chunk-only implementation
        # cannot index this packet until the generator is exhausted.
        deadline = time.monotonic() + 12
        while time.monotonic() < deadline:
            if matching() >= 1:
                print("PASS low-volume delivery while capture remains open")
                break
            time.sleep(0.25)
        else:
            raise AssertionError("single event not indexed while capture is open")
        yield dict(rows[0])

    deliver_packets(client, slowly_produced_packets(), chunk_size=100, flush_interval=0.5)
    deadline = time.monotonic() + 8
    while time.monotonic() < deadline and matching() < 2:
        time.sleep(0.25)
    assert matching() == 2, "final pending event was not flushed on shutdown"
    print("PASS tshark offline SYN -> two Elasticsearch 8 indexed packets")
