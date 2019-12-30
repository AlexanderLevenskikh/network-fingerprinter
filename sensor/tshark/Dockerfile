ARG ELASTIC_HOST
FROM nikolaik/python-nodejs:python3.8-nodejs13-alpine

USER root

COPY . /usr/share/tshark
WORKDIR /usr/share/tshark

RUN apk update
RUN apk --update --no-cache add tshark curl
RUN pip install --upgrade pip
RUN pip install click pyyaml elasticsearch
# TODO Credentials ENV
RUN chmod +x ./elk-template.sh && ./elk-template.sh elastic:12345@192.168.1.50:9200

CMD exec python ./index.py -i $(/sbin/ip address | grep '^2: ' | awk '{ print $2 }' | tr -d [:punct:]) --elastic-url=elastic:12345@192.168.1.50:9200
