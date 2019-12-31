ARG ELASTIC_HOST
ARG ELASTIC_USERNAME
ARG ELASTIC_PASSWORD
FROM nikolaik/python-nodejs:python3.8-nodejs13-alpine

ARG ELASTIC_HOST
ARG ELASTIC_USERNAME
ARG ELASTIC_PASSWORD
ENV host=$ELASTIC_HOST
ENV name=$ELASTIC_USERNAME
ENV pass=$ELASTIC_PASSWORD

USER root

COPY . /usr/share/tshark
WORKDIR /usr/share/tshark

RUN apk update
RUN apk --update --no-cache add tshark curl
RUN pip install --upgrade pip
RUN pip install click pyyaml elasticsearch
RUN chmod +x ./elk-template.sh && ./elk-template.sh ${name}:${pass}@${host}

CMD exec python ./index.py -i $(/sbin/ip address | grep '^2: ' | awk '{ print $2 }' | tr -d [:punct:]) --elastic-url=${name}:${pass}@${host}
