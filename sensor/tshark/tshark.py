"""Live tshark EK packet stream adapter; compatible with Wireshark 4 output."""
import json
import os
import signal
import subprocess
from typing import Iterable, Iterator, Union

import yaml

FILTER = (
    "tcp.flags.syn == 1 or tls.handshake.type == 1 or "
    "http.request == 1 or http.response == 1"
)


def _make_capturing_command(interface: str, packet_filter: str | None) -> list[str]:
    if not interface:
        raise ValueError("SENSOR_INTERFACE is required for Linux live capture")
    with open(os.path.join(os.path.dirname(__file__), "espcap.yml"), encoding="utf-8") as config_file:
        tshark = yaml.safe_load(config_file)["tshark_path"]
    command = [tshark, "-l", "-T", "ek", "-n", "-Y", FILTER, "-i", interface]
    if packet_filter:
        # A capture filter is a single BPF expression, not arbitrary argv.
        command.extend(["-f", packet_filter])
    return command


def decode_ek(lines: Iterable[Union[str, bytes]], sensor_id: str, guid: str) -> Iterator[dict]:
    """Ignore tshark EK bulk actions, yield only documents with stable stream IDs."""
    for raw in lines:
        line = raw.decode("utf-8") if isinstance(raw, bytes) else raw
        if not line.strip():
            continue
        packet = json.loads(line)
        if "index" in packet:
            continue
        layers = packet.get("layers")
        if not isinstance(layers, dict):
            raise ValueError("Invalid tshark EK packet document")
        tcp = layers.get("tcp")
        if isinstance(tcp, dict):
            # Wireshark 4 uses tcp_tcp_flags_* instead of legacy query field names.
            for flag in ("urg", "ack", "push", "reset", "syn", "fin"):
                modern = "tcp_tcp_flags_" + flag
                if modern in tcp:
                    value = tcp.pop(modern)
                    tcp["tcp_flags_tcp_flags_" + flag] = (
                        "1" if value is True or value == 1 or value == "1" else "0"
                    )
            if "tcp_tcp_flags_str" in tcp:
                tcp["tcp_flags_tcp_flags_str"] = tcp.pop("tcp_tcp_flags_str")
        stream = (
            tcp.get("tcp_tcp_stream") if isinstance(tcp, dict) else None
        )
        if stream is None:
            udp = layers.get("udp")
            stream = udp.get("udp_udp_stream") if isinstance(udp, dict) else None
        packet["streamId"] = str(guid) + "-" + (str(stream) if stream is not None else "unknown")
        packet["sensorId"] = "sensor-" + str(sensor_id)
        yield packet


def capture(interface: str, sensor_id: str, packet_filter: str | None, guid: str) -> Iterator[dict]:
    command = _make_capturing_command(interface, packet_filter)
    with subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL) as process:
        terminated = False

        def shutdown(_signum, _frame):
            nonlocal terminated
            terminated = True
            process.terminate()

        previous_term = signal.signal(signal.SIGTERM, shutdown)
        previous_int = signal.signal(signal.SIGINT, shutdown)
        try:
            yield from decode_ek(process.stdout, sensor_id, guid)
            code = process.wait()
            if code and not terminated:
                raise RuntimeError("tshark exited with code " + str(code))
        finally:
            signal.signal(signal.SIGTERM, previous_term)
            signal.signal(signal.SIGINT, previous_int)
            if process.poll() is None:
                process.terminate()
                try:
                    process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    process.kill()
                    process.wait()
