ARG ELASTIC_HOST
ARG KIBANA_HOST
ARG ELASTIC_USERNAME
ARG ELASTIC_PASSWORD
ARG SENSOR_ID
ARG SENSOR_INTERFACE
FROM nikolaik/python-nodejs:python3.8-nodejs13-alpine

ARG ELASTIC_HOST
ARG KIBANA_HOST
ARG ELASTIC_USERNAME
ARG ELASTIC_PASSWORD
ARG SENSOR_ID
ARG SENSOR_INTERFACE
ENV host=$ELASTIC_HOST
ENV kibana_host=$KIBANA_HOST
ENV name=$ELASTIC_USERNAME
ENV pass=$ELASTIC_PASSWORD
ENV sensor_id=$SENSOR_ID
ENV sensor_if=$SENSOR_INTERFACE

USER root

COPY . /usr/share/tshark
WORKDIR /usr/share/tshark

RUN apk update
RUN apk --update --no-cache add tshark~=3.0.7 curl
RUN pip install --upgrade pip
RUN pip install click pyyaml elasticsearch
RUN chmod +x ./elk-template.sh && ./elk-template.sh ${name}:${pass}@${host}
# 409 is ok, kibana index pattern already was added
RUN chmod +x ./kibana-template.sh && ./kibana-template.sh ${name}:${pass}@${kibana_host}; exit 0

CMD exec python ./index.py -i $(echo ${sensor_if} | grep . || /sbin/ip address | grep '^2: ' | awk '{ print $2 }' | tr -d [:punct:]) --elastic-url=${name}:${pass}@${host} --sensor-id=${sensor_id}
