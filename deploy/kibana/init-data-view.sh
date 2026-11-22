#!/bin/sh
set -eu
: "${ELASTIC_PASSWORD:?}"

# Idempotent Kibana 7.4 saved-object API (newer Kibana uses data views).
curl --fail-with-body --silent --show-error \
  --user "elastic:$ELASTIC_PASSWORD" \
  --header "Content-Type: application/json" \
  --header "kbn-xsrf: network-fingerprinter" \
  --request POST \
  --data '{"attributes":{"title":"packets-*","timeFieldName":"timestamp"}}' \
  "http://kibana:5601/api/saved_objects/index-pattern/packets-*?overwrite=true"
echo
echo "Network Fingerprinter: packets-* Kibana index pattern installed."
