FROM nikolaik/python-nodejs:python3.8-nodejs13-alpine

USER root

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/client
RUN npm ci --loglevel error
RUN npm run build:prod
RUN cp -r dist ../server/static

WORKDIR /usr/src/app/server
RUN cp -r templates static
RUN apk add --update alpine-sdk
RUN npm ci --loglevel error
RUN npm run build
RUN npm run start:prod
