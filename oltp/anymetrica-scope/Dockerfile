ARG BASE_CONTAINER=registry.pbc.technology/anymetrica/nginx:1.15.9-alpine

FROM ${BASE_CONTAINER}
ENV PROXY_DIR=/usr/share/nginx/html/

RUN apk add --no-cache git && rm -rf /etc/nginx/conf.d/

COPY ./nginx.scope.conf /etc/nginx/conf.d/nginx.scope.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN  git clone https://mrjj:DwkBttnMbyrNpj73d6gj@bitbucket.org/anymetrics/anymetrica-scope.git /tmp/anymetrica-scope && \
    cp -rf /tmp/anymetrica-scope/build/* ${PROXY_DIR} && \
    rm -rf /tmp/anymetrica-scope

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
