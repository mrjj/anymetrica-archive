ARG BASE_CONTAINER=node:10-centos7
FROM ${BASE_CONTAINER}

USER root

COPY . /home/node/
RUN rm -rf /home/node/node_modules/ && \
    chown -R node:node /home/node/
RUN yum install -y \
    gcc-c++ \
    make \
    git \
    wget

RUN npm install -g \
        node-gyp \
        yarn

USER node


RUN yarn install && \
    yarn run build && \
    yarn cache clean --force

ENV NODE_ENV=production
WORKDIR  /home/node/
