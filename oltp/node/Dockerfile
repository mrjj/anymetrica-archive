ARG BASE_CONTAINER=centos:7.6.1810
FROM ${BASE_CONTAINER}

LABEL maintainer="Ilya Kutukov <post.ilya@gmail.com>"
LABEL from="https://github.com/CentOS/sig-cloud-instance-images/blob/docker/Dockerfile"

ENV container docker
ARG NODE_VERSION=10.15.1
ENV NODE_VERSION=${NODE_VERSION}

RUN groupadd -r node --gid=1000 && \
    useradd -r -g node --uid=1000 node

RUN rpm --import http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-5
RUN yum install -y \
    git && \
  yum clean all

COPY setup_node_10_x.sh ./setup_node_10_x.sh
RUN chmod +x ./setup_node_10_x.sh && \
    ./setup_node_10_x.sh && \
    rm -f ./setup_node_10_x.sh && \
    yum install -y \
        nodejs && \
    yum clean all

RUN npm install -g \
        node-gyp \
        yarn && \
    npm cache clean --force

RUN yarn global add \
        pegjs@0.10.0
#         \
#        @ffmpeg-installer/ffmpeg@1.0.17 \
#        lodash@4.17.11 \
#        flow-bin@0.94.0 \
#        react-scripts@2.1.5 \
#        grpc@1.19.0 \
#        nodemon@1.18.10 \
#        d3@5.9.1 \
#        antd@3.14.1

RUN mkdir -p /home/node && \
    chown node:node /home/node && \
    cd /home/node

WORKDIR /home/node

COPY ./*.sh /home/node/
RUN chmod +x /home/node/*.sh

USER node

ENTRYPOINT ["/home/node/entrypoint.sh"]
