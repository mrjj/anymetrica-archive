ARG GOLANG_BASE_CONTAINER=golang:1.11.4-alpine3.8
ARG BASE_CONTAINER=alpine:3.8

FROM ${GOLANG_BASE_CONTAINER}

LABEL maintainer="Minio Inc <dev@minio.io>"
LABEL maintainer="Ilya Kutukov <post.ilya@gmail.com>"
LABEL from="https://github.com/nodejs/docker-node/blob/e9d9c1ce0f4e87b11d7b0ecff529b715038782ae/10/alpine/Dockerfile"

ARG MINIO_RELEASE=RELEASE.2019-01-16T21-44-08Z

ENV GOPATH /go
ENV CGO_ENABLED 0

WORKDIR /go/src/github.com/minio/
VOLUME ["/artifacts"]
RUN \
    apk add --no-cache git && \
    mkdir -p /artifacts && \
    mkdir -p /go/src/github.com/minio/minio/ && \
    cd /artifacts && \
    wget https://github.com/minio/minio/archive/${MINIO_RELEASE}.tar.gz && \
    tar -xvf ./${MINIO_RELEASE}.tar.gz && \
    mv ./minio-${MINIO_RELEASE}/** /go/src/github.com/minio/minio && \
    du -d 2 /go/src/github.com/minio/ && \
    cd /go/src/github.com/minio/minio/ && \
    go install -v -ldflags "$(go run buildscripts/gen-ldflags.go)"

ARG BASE_CONTAINER=alpine:3.8
FROM ${BASE_CONTAINER}

ENV MINIO_UPDATE off
ENV MINIO_ACCESS_KEY_FILE=access_key
ENV MINIO_SECRET_KEY_FILE=secret_key

EXPOSE 9000

COPY --from=0 /go/bin/minio /usr/bin/minio
COPY dockerscripts/docker-entrypoint.sh /usr/bin/
COPY dockerscripts/healthcheck.sh /usr/bin/

RUN \
apk add --no-cache ca-certificates 'curl>7.61.0' && \
echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf

ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]

VOLUME ["/data"]

HEALTHCHECK --interval=30s --timeout=5s \
CMD /usr/bin/healthcheck.sh

CMD ["minio"]
