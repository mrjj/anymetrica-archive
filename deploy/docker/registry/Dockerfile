FROM node:10.15.1-alpine

MAINTAINER Ilya Kutukov <post.ilya@gmail.com>

COPY ./anymetrica-registry/src /usr/src/app
COPY ./anymetrica-registry/package.json /usr/src/app

COPY ./anymetrica-api /usr/src
RUN apk add --update --no-cache curl ca-certificates git &&\
    git clone https://mrjj:DwkBttnMbyrNpj73d6gj@bitbucket.org/anymetrics/grid-grpc.git && cd ./grid-grpc && npm install -g && cd .. && rm -rf grid-grpc &&\
    apk del git

WORKDIR /usr/src/app

RUN npm install

EXPOSE 8000
EXPOSE 50050

CMD ./scripts/start.sh
