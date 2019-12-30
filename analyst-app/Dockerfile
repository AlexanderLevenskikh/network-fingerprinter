FROM mhart/alpine-node:13.5

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/client
RUN npm ci --loglevel error
RUN npm run build:prod
COPY ./dist ../server/static

WORKDIR /usr/src/app/server
COPY ./templates ./static
RUN npm ci --loglevel error
RUN npm run start:prod
