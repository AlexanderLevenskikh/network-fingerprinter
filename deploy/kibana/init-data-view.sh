#!/bin/sh
set -eu
: "${ELASTIC_PASSWORD:?}"

# Kibana 8 login can pass its healthcheck before API routes accept connections.
# Retry the idempotent create/override request for up to 180 seconds.
attempt=0
while [ "$attempt" -lt 90 ]; do
  attempt=$((attempt + 1))
  result=$(curl --silent --output /dev/null --write-out '%{http_code}' \
    --connect-timeout 3 --max-time 8 \
    --user "elastic:$ELASTIC_PASSWORD" \
    --header "Content-Type: application/json" \
    --header "kbn-xsrf: network-fingerprinter" \
    --request POST \
    --data '{"data_view":{"id":"packets-*","title":"packets-*","name":"Network Fingerprinter","timeFieldName":"timestamp","allowNoIndex":true},"override":true}' \
    "http://kibana:5601/api/data_views/data_view") && status=0 || status=$?
  if [ "$status" -eq 0 ] && [ "$result" -ge 200 ] && [ "$result" -lt 300 ]; then
    echo "Network Fingerprinter: Kibana 8 packets-* data view initialized."
    exit 0
  fi
  case "$result" in
    401|403|400)
      echo "Kibana data view bootstrap rejected: HTTP $result (not retryable)." >&2
      exit 1
      ;;
  esac
  echo "Kibana data view not yet ready (attempt $attempt/90, HTTP $result, curl exit $status)." >&2
  sleep 2
done
echo "Kibana data view bootstrap timed out (last HTTP $result, curl exit $status)." >&2
exit 1
