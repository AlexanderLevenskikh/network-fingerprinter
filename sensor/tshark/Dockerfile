ARG ELASTIC_HOST
ARG KIBANA_HOST
ARG ELASTIC_USERNAME
ARG ELASTIC_PASSWORD
FROM nikolaik/python-nodejs:python3.8-nodejs13-alpine

ARG ELASTIC_HOST
ARG KIBANA_HOST
ARG ELASTIC_USERNAME
ARG ELASTIC_PASSWORD
ENV host=$ELASTIC_HOST
ENV kibana_host=$KIBANA_HOST
ENV name=$ELASTIC_USERNAME
ENV pass=$ELASTIC_PASSWORD

USER root

COPY . /usr/share/tshark
WORKDIR /usr/share/tshark

RUN apk update
RUN apk --update --no-cache add tshark~=3.0.7 curl
RUN pip install --upgrade pip
RUN pip install click pyyaml elasticsearch
RUN chmod +x ./elk-template.sh && ./elk-template.sh ${name}:${pass}@${host}
RUN chmod +x ./kibana-template.sh && ./kibana-template.sh ${name}:${pass}@${kibana_host} 2> /dev/null

CMD exec python ./index.py -i $(/sbin/ip address | grep '^2: ' | awk '{ print $2 }' | tr -d [:punct:]) --elastic-url=${name}:${pass}@${host}
