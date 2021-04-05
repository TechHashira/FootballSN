FROM node:15.13.0-alpine3.10

WORKDIR /usr/src/app


COPY package*.json ./


RUN npm i
COPY . .

RUN npm run build

