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

    def test_bad_ek_is_fatal(self):
        with self.assertRaises(ValueError):
            list(decode_ek(['{"not":"an EK document"}'], "1", "x"))


if __name__ == "__main__":
    unittest.main()
