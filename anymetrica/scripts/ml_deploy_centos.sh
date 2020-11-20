#!/usr/bin/env bash

#rm -rf ./anymetrica
#git clone https://mrjj:DwkBttnMbyrNpj73d6gj@bitbucket.org/anymetrics/anymetrica.git
#cd ./anymetrica

yum remove -y \
    docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-selinux \
    docker-engine-selinux \
    docker-engine \
    docker-ce

yum install -y \
    yum-utils \
    device-mapper-persistent-data \
    lvm2 \
    gcc-c++ \
    make \
    git


yum remove -y \
    nodejs \
    npm
bash ./setup_node_10_x.sh
yum install -y \
    nodejs

npm install -g \
    yarn

yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install -y docker-ce
systemctl start docker
docker run hello-world

yarn run bootstrap
