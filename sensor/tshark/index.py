import click
import sys

import uuid as uuid
from elasticsearch import Elasticsearch
from elasticsearch import helpers

from tshark import capture
from elk_utils import index_packets


def start_capture(es_connection, sensor_id, interface, packet_filter, chunk_length, guid):
    try:
        capture_res = capture(interface, sensor_id, packet_filter, guid)
        helpers.bulk(
            client=es_connection,
            actions=index_packets(capture=capture_res),
            chunk_size=chunk_length,
            raise_on_error=True)

    except Exception as e:
        print('[ERROR] ', e)
        sys.exit(1)


@click.command()
@click.option('--elastic-url', default=None, help='IP of elasticsearch')
@click.option('--sensor-id', default='1')
@click.option('-i', default=None, help='Network interface for capturing')
@click.option('--filter', default=None, help='Custom packet filter')
@click.option('--chunk-length', default=100, help='Number of packets to bulk index (default=100)')
def main(elastic_url, sensor_id, i, filter, chunk_length):
    guid = str(uuid.uuid1())

    try:
        if elastic_url is None:
            print('Elastic node is not specified')
            sys.exit(1)

        if i is None:
            print('Network interface is not specified')
            sys.exit(1)

        es_connection = Elasticsearch(elastic_url)

        start_capture(
            es_connection=es_connection,
            sensor_id=sensor_id,
            interface=i,
            packet_filter=filter,
            chunk_length=chunk_length,
            guid=guid)

    except Exception as e:
        print('[ERROR] ', e)
        sys.exit(1)


if __name__ == '__main__':
    main()
