#!/usr/bin/env bash
set -x

     #########################
    ##                     ##_
   ##      SEED HOST      ##  #
  ##                     ##  #
 #########################  #
  #========================#

# Consts
CHANNEL="stable"

# Set locale
echo "LANG=en_US.utf-8" >> /etc/environment
echo "LC_ALL=en_US.utf-8" >> /etc/environment

# Add docker config
sudo systemctl stop docker.service || ''
sudo yum remove -y docker-ce

if [[ ! $(which docker) ]]; then
  # Setup docker if none is installed
  bash /tmp/get-docker.sh
  sudo systemctl start docker.service
  sudo usermod -aG docker $(whoami);
else
  # Have docker
  if [[ $(pidof dockerd) ]]; then
    sudo kill -SIGHUP $(pidof dockerd)
#    sudo systemctl reset-failed docker.service
    sudo systemctl start docker.service
  fi
fi

# Setup folders for minio
sudo groupadd -f docker
sudo usermod -aG docker $(whoami)

# default
mkdir -p /home/docker/exec
mkdir -p /home/docker/volumes
mkdir -p /home/minio
