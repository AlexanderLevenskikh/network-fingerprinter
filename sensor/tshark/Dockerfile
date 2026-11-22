# Stage 2: the legacy base/runtime remain until the dependency migration.
# Configuration and credentials are runtime-only; no network calls in docker build.
FROM nikolaik/python-nodejs:python3.8-nodejs13-alpine

USER root
COPY . /usr/share/tshark
WORKDIR /usr/share/tshark

# Package versions will be pinned together with tshark/Python in Step 3.
RUN apk add --no-cache tshark curl \
    && pip install --upgrade pip \
    && pip install click pyyaml elasticsearch

# The Linux capture profile must explicitly select an interface.
CMD exec python ./index.py \
    -i "${SENSOR_INTERFACE:?Set SENSOR_INTERFACE for the capture-linux profile}" \
    --elastic-url="${ELASTIC_USERNAME:-elastic}:${ELASTIC_PASSWORD}@${ELASTIC_HOST:-127.0.0.1:9200}" \
    --sensor-id="${SENSOR_ID:-1}"
