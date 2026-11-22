import json
import unittest

from elk_utils import index_packets
from tshark import decode_ek, _make_capturing_command


class SensorTest(unittest.TestCase):
    def test_ek_streams_and_wireshark4_flags(self):
        rows = [
            '{"index":{"_index":"packets-2026-01-01","_type":"_doc"}}',
            json.dumps({"timestamp": "1767225600000", "layers": {
                "tcp": {"tcp_tcp_stream": "9", "tcp_tcp_flags_syn": True,
                        "tcp_tcp_flags_ack": False}}}),
        ]
        packets = list(decode_ek(rows, "3", "capture-1"))
        self.assertEqual(len(packets), 1)
        self.assertEqual(packets[0]["streamId"], "capture-1-9")
        self.assertEqual(packets[0]["sensorId"], "sensor-3")
        self.assertEqual(packets[0]["layers"]["tcp"]["tcp_flags_tcp_flags_syn"], "1")
        self.assertEqual(packets[0]["layers"]["tcp"]["tcp_flags_tcp_flags_ack"], "0")
        self.assertEqual(next(index_packets(iter(packets)))["_index"], "packets-2026-01-01")

    def test_capture_filter_is_not_arbitrary_argv(self):
        cmd = _make_capturing_command("eth0", "tcp port 443")
        self.assertEqual(cmd[-2:], ["-f", "tcp port 443"])

    def test_real_tshark_offline_pcap(self):
        """Decode one actual synthetic Ethernet/IP/TCP SYN through distro tshark."""
        import socket
        import struct
        import subprocess
        import tempfile
        from pathlib import Path

        src = socket.inet_aton("192.0.2.10")
        dst = socket.inet_aton("198.51.100.20")
        ethernet = bytes.fromhex("aabbccddeeff1122334455660800")
        ipv4 = struct.pack("!BBHHHBBH4s4s", 0x45, 0, 40, 0, 0, 64, 6, 0, src, dst)
        tcp = struct.pack("!HHIIBBHHH", 12345, 443, 1, 0, 0x50, 0x02, 65535, 0, 0)
        packet = ethernet + ipv4 + tcp
        pcap = (
            struct.pack("<IHHIIII", 0xA1B2C3D4, 2, 4, 0, 0, 65535, 1)
            + struct.pack("<IIII", 1767225600, 0, len(packet), len(packet))
            + packet
        )
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "synthetic.pcap"
            path.write_bytes(pcap)
            result = subprocess.run(
                ["/usr/bin/tshark", "-T", "ek", "-n", "-Y", "tcp.flags.syn == 1",
                 "-r", str(path)],
                capture_output=True, text=True, check=True, timeout=15,
            )
            packets = list(decode_ek(result.stdout.splitlines(), "7", "offline"))
        self.assertEqual(len(packets), 1)
        self.assertEqual(packets[0]["streamId"], "offline-0")
        self.assertEqual(packets[0]["layers"]["tcp"]["tcp_flags_tcp_flags_syn"], "1")
        self.assertEqual(packets[0]["sensorId"], "sensor-7")

    def test_bad_ek_is_fatal(self):
        with self.assertRaises(ValueError):
            list(decode_ek(['{"not":"an EK document"}'], "1", "x"))


if __name__ == "__main__":
    unittest.main()
