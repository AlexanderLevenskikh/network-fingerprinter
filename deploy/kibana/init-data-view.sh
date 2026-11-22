#!/bin/sh
set -eu
: "${ELASTIC_PASSWORD:?}"

# Kibana 8 public data-views API, idempotent with override=true.
curl --fail-with-body --silent --show-error \
  --user "elastic:$ELASTIC_PASSWORD" \
  --header "Content-Type: application/json" \
  --header "kbn-xsrf: network-fingerprinter" \
  --request POST \
  --data '{"data_view":{"id":"packets-*","title":"packets-*","name":"Network Fingerprinter","timeFieldName":"timestamp","allowNoIndex":true},"override":true}' \
  "http://kibana:5601/api/data_views/data_view"
echo
echo "Network Fingerprinter: Kibana 8 packets-* data view initialized."
