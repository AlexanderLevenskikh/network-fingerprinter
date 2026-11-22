"""Elasticsearch bulk actions for the existing packets-* index layout."""
from datetime import datetime, timezone


def index_packets(capture):
    for packet in capture:
        epoch_ms = int(packet["timestamp"])
        date = datetime.fromtimestamp(epoch_ms / 1000, timezone.utc).strftime("%Y-%m-%d")
        yield {
            "_op_type": "index",
            "_index": "packets-" + date,
            "_source": packet,
        }
