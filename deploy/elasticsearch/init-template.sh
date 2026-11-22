#!/bin/sh
set -eu
: "${ELASTIC_PASSWORD:?}"
: "${KIBANA_SYSTEM_PASSWORD:?}"

# Elasticsearch 8 needs the kibana_system account for Kibana internal operations.
password_json="$(printf '%s' "$KIBANA_SYSTEM_PASSWORD" | sed 's/\\/\\\\/g; s/"/\\"/g')"
curl --fail-with-body --silent --show-error \
  --user "elastic:$ELASTIC_PASSWORD" \
  --header "Content-Type: application/json" \
  --request POST \
  --data "{\"password\":\"$password_json\"}" \
  "http://elasticsearch:9200/_security/user/kibana_system/_password"

# Composable index template (supported in Elasticsearch 8).
curl --fail-with-body --silent --show-error \
  --user "elastic:$ELASTIC_PASSWORD" \
  --header "Content-Type: application/json" \
  --request PUT \
  --data-binary @/bootstrap/packets-template.json \
  "http://elasticsearch:9200/_index_template/packets"
echo
echo "Network Fingerprinter: Elasticsearch 8 template and Kibana system user initialized."
