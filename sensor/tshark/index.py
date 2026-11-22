"""Stream selected packets from tshark into Elasticsearch 8.x."""
import os
import sys
from uuid import uuid4

import click
from elasticsearch import Elasticsearch, helpers

from tshark import capture
from elk_utils import index_packets


@click.command()
@click.option("--elastic-url", envvar="ELASTIC_URL", default=None,
              help="Elasticsearch HTTP URL without credentials")
@click.option("--sensor-id", envvar="SENSOR_ID", default="1")
@click.option("-i", "interface", envvar="SENSOR_INTERFACE", default=None)
@click.option("--filter", "packet_filter", default=None)
@click.option("--chunk-length", type=click.IntRange(min=1, max=1000), default=100)
def main(elastic_url, sensor_id, interface, packet_filter, chunk_length):
    elastic_url = elastic_url or "http://" + os.getenv("ELASTIC_HOST", "127.0.0.1:9200")
    username = os.environ.get("ELASTIC_USERNAME")
    password = os.environ.get("ELASTIC_PASSWORD")
    if not username or not password or not interface:
        raise click.ClickException("ELASTIC_USERNAME, ELASTIC_PASSWORD and SENSOR_INTERFACE are required")

    client = Elasticsearch(
        elastic_url,
        basic_auth=(username, password),
        request_timeout=20,
        max_retries=3,
        retry_on_timeout=True,
    )
    try:
        helpers.bulk(
            client,
            index_packets(capture(interface, sensor_id, packet_filter, str(uuid4()))),
            chunk_size=chunk_length,
            raise_on_error=True,
        )
    except KeyboardInterrupt:
        return
    except Exception:
        # The underlying client exception may contain request URL or credentials.
        click.echo("[ERROR] Sensor capture or indexing failed; inspect internal health", err=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
