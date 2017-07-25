FROM node:8-alpine

RUN apk add --no-cache make gcc g++ python

RUN apk add --update --no-cache python \
    python-dev \
    py-pip \
 && rm -rf /var/cache/apk/*

WORKDIR /

RUN yarn global add pm2

COPY yarn.lock /yarn.lock
COPY package.json /package.json
COPY server.js /server.js

RUN yarn install --flat

COPY ./src /src
