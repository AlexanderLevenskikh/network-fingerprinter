import click
import sys

from elasticsearch import Elasticsearch
from elasticsearch import helpers

from tshark import capture
from elk_utils import index_packets


def start_capture(es_connection, interface, packet_filter, chunk_length):
    try:
        capture_res = capture(interface, packet_filter)
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
@click.option('-i', default=None, help='Network interface for capturing')
@click.option('--filter', default=None, help='Custom packet filter')
@click.option('--chunk-length', default=100, help='Number of packets to bulk index (default=100)')
def main(elastic_url, i, filter, chunk_length):
    try:
        if elastic_url is None:
            print('Elastic node is not specified')
            sys.exit(1)

        if i is None:
            print('Network interface is not specified')
            sys.exit(1)

        es_connection = Elasticsearch(elastic_url)

        start_capture(es_connection=es_connection, interface=i, packet_filter=filter, chunk_length=chunk_length)

    except Exception as e:
        print('[ERROR] ', e)
        sys.exit(1)


if __name__ == '__main__':
    main()
