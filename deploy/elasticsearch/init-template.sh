#!/bin/sh
set -eu
: "${ELASTIC_PASSWORD:?}"

# Idempotent legacy 7.x composable startup: upload only after ES is healthy.
# The template is deliberately kept in legacy _template format until Step 3.
curl --fail-with-body --silent --show-error \
  --user "elastic:$ELASTIC_PASSWORD" \
  --header "Content-Type: application/json" \
  --request PUT \
  --data-binary @/bootstrap/packets-template.json \
  "http://elasticsearch:9200/_template/packets"
echo
echo "Network Fingerprinter: packets-* index template installed."
