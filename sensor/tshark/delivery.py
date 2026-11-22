"""Bounded-latency Elasticsearch delivery without moving signal-owning tshark capture off the main thread."""
import queue
import threading
import time

from elasticsearch import helpers
from elk_utils import index_packets


def deliver_packets(client, packets, chunk_size=100, flush_interval=1.0):
    """Flush small live streams promptly and propagate transport/capture errors.

    The producer consumes tshark in the calling (main) thread. Only Elasticsearch
    writes run in the worker; this matters because capture() installs SIGTERM/SIGINT.
    """
    if chunk_size < 1 or flush_interval <= 0:
        raise ValueError("chunk_size and flush_interval must be positive")

    pending = queue.Queue(maxsize=max(2, chunk_size * 2))
    stop = object()
    failures = []

    def worker():
        batch = []
        deadline = None
        try:
            while True:
                timeout = max(0.0, deadline - time.monotonic()) if batch else None
                try:
                    item = pending.get(timeout=timeout)
                except queue.Empty:
                    item = None
                if item is stop:
                    if batch:
                        helpers.bulk(client, batch, chunk_size=chunk_size, raise_on_error=True)
                    return
                if item is not None:
                    batch.append(item)
                    if deadline is None:
                        deadline = time.monotonic() + flush_interval
                if len(batch) >= chunk_size or (batch and time.monotonic() >= deadline):
                    helpers.bulk(client, batch, chunk_size=chunk_size, raise_on_error=True)
                    batch = []
                    deadline = None
        except BaseException as exc:
            failures.append(exc)

    thread = threading.Thread(target=worker, name="sensor-es-delivery", daemon=True)
    thread.start()

    def enqueue(item):
        while thread.is_alive():
            try:
                pending.put(item, timeout=0.2)
                return
            except queue.Full:
                continue
        if failures:
            raise RuntimeError("Elasticsearch delivery failed") from failures[0]
        raise RuntimeError("Elasticsearch delivery worker stopped unexpectedly")

    try:
        for action in index_packets(packets):
            if failures:
                raise RuntimeError("Elasticsearch delivery failed") from failures[0]
            enqueue(action)
    finally:
        # Never leave an indexing thread behind when capture fails or is interrupted.
        if thread.is_alive():
            enqueue(stop)
        thread.join()
        if failures:
            raise RuntimeError("Elasticsearch delivery failed") from failures[0]
