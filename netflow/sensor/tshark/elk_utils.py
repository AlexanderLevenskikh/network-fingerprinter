from datetime import datetime


def index_packets(capture):
    for packet in capture:
        timestamp = int(packet['timestamp'])/1000
        action = {
            '_op_type': 'index',
            '_index': 'packets-' + datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d'),
            '_source': packet
        }
        yield action
