FROM node:24-bookworm-slim

# Official Node.js LTS base with Debian-supported packet decoding utilities.
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
    tshark curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY . .

RUN node ./prepareSignatures.js

WORKDIR /usr/src/app/client
RUN npm ci --loglevel error
RUN npm run build:prod
RUN mkdir -p ../server/static
RUN cp -r dist/* ../server/static

WORKDIR /usr/src/app/server
RUN cp -r templates/* static

RUN npm ci --loglevel error

RUN npm run build
CMD [ "npm", "run", "start:prod" ]
