#!/bin/sh

set -x

. ./deployment/stage/swarm_env.sh

while read p; do
  rsync --force --recursive ./deployment/stage/seed/ root@${p}:/
done <./deployment/stage/hosts

pssh -v -h ./deployment/stage/hosts -l root -i -t 5 -x "-oStrictHostKeyChecking=no -i ~/.ssh/id_rsa" "chmod +x /tmp/seed-host.sh && /tmp/seed-host.sh"

# Setup swarm master
ssh root@${SWARM_MASTER_IP} "docker swarm init  --force-new-cluster --advertise-addr ${SWARM_MASTER_IP}"
ssh root@${SWARM_MASTER_IP} "docker swarm join-token manager -q" > ./deployment/stage/swarm-join-token-manager
ssh root@${SWARM_MASTER_IP} "docker swarm join-token worker -q" > ./deployment/stage/swarm-join-token-worker

#docker node update --label-add minio1=true <DOCKER-NODE1>
#docker node update --label-add minio2=true <DOCKER-NODE2>
#docker node update --label-add minio3=true <DOCKER-NODE3>
#docker node update --label-add minio4=true <DOCKER-NODE4>

# CERT
# Your registry URL is https://myregistry.domain.com/.
# Your DNS, routing, and firewall settings allow access to the registry’s host on port 443.
# You have already obtained a certificate from a certificate authority (CA).
# mkdir -p certs
# Copy the .crt and .key files from the CA into the certs directory. The following steps assume that the files are named domain.crt and domain.key.
# docker container stop registry

# Convert ext4 -> xfs for /home
# fstransform $(findmnt -n -o SOURCE --target /home) xfs

#letsencrypt
#The letsencrypt structure within tls is optional. Use this to configure TLS certificates provided by Let’s Encrypt.
#
#NOTE: When using Let’s Encrypt, ensure that the outward-facing address is accessible on port 443. The registry defaults to listening on port 5000. If you run the registry as a container, consider adding the flag -p 443:5000 to the docker run command or using a similar setting in a cloud configuration.
#
#Parameter	Required	Description
#cachefile	yes	Absolute path to a file where the Let’s Encrypt agent can cache data.
#email	yes	The email address used to register with Let’s Encrypt.

#Some volume drivers may take options to customize the volume creation. Use the -o or --opt flags to pass driver options:
# The most common are ext2, ext3, ext4, xfs, btrfs, vfat, sysfs, proc, nfs and cifs.
#docker volume create --driver local \
#    --opt type=btrfs \
#    --opt device=/deploy-dev/sda2 \
#    foo

#https://docs.docker.com/storage/volumes/
#$ docker volume create my-vol
#$ docker run -d \
#  --name devtest \
#  --mount source=myvol2,target=/app \
#  nginx:latest

#When you start a service and define a volume, each service container uses its own local volume.
#None of the containers can share this data if you use the local volume driver, but some volume drivers do support shared storage.
#Docker for AWS and Docker for Azure both support persistent storage using the Cloudstor plugin.
#The following example starts a nginx service with four replicas, each of which uses a local volume called myvol2.
#$ docker service create -d \
#  --replicas=4 \
#  --name devtest-service \
#  --mount source=myvol2,target=/app \
#  nginx:latest

#https://www.reddit.com/r/docker/comments/7a9g11/persistent_storage_options_for_docker_swarm/
#No configuration of the host no. As per: https://docs.docker.com/engine/reference/commandline/volume_create/#driver-specific-options It's not tricky.
#https://docs.docker.com/engine/reference/commandline/volume_create/#driver-specific-options
#
#$ docker volume create --driver local \
#--opt type=nfs \
#--opt o=addr=192.168.1.1,rw \
#--opt device=:/path/to/dir \
#foo
#https://docs.docker.com/storage/storagedriver/select-storage-driver/
# overlay2 is the preferred storage driver, for all currently supported Linux distributions, and requires no extra configuration.
# aufs is the preferred storage driver for Docker 18.06 and older, when running on Ubuntu 14.04 on kernel 3.13 which has no support for overlay2.

#https://docs.docker.com/storage/storagedriver/select-storage-driver/
#Storage driver	Supported backing filesystems
#overlay2, overlay	xfs with ftype=1, ext4
#aufs	xfs, ext4
#devicemapper	direct-lvm
#btrfs	btrfs
#zfs	zfs
#vfs	any filesystem

#https://docs.docker.com/storage/storagedriver/overlayfs-driver/
#Use the OverlayFS storage driver

#In my setup, docker daemon is running with overlay2 storage backed by xfs. Following this https://docs.docker.com/engine/reference/commandline/run/#set-storage-driver-options-per-container 167 document I found that I need to mount / with pqouta option to able storage quota per container, so I edited /etc/fstab to include pquota option like /deploy-dev/md1 / xfs defaults,pquota 0 0, but I am not able to run a container like below
#root@n1:~# docker run -it --storage-opt size=120G fedora /bin/bash
#docker: Error response from daemon: --storage-opt is supported only for overlay over xfs with 'pquota' mount option.
#See 'docker run --help'.
#Do I need to follow any other steps?
#
#I had to update /etc/default/grub with the following entry: GRUB_CMDLINE_LINUX_DEFAULT="rootflags=uquota,pquota"

#https://docs.docker.com/engine/reference/commandline/run/#set-storage-driver-options-per-container
#$ docker run -it --storage-opt size=120G fedora /bin/bash

#he base device size can be increased at daemon restart which will allow all future images and containers (based on those new images) to be of the new base device size.

#Examples
#$ sudo dockerd --storage-opt dm.basesize=50G
#deploy-dev/mapper/C1543466920I0-rootfs  9.8G  4.3G  5.0G  47% /
#devtmpfs                           16G     0   16G   0% /deploy-dev
#tmpfs                              16G     0   16G   0% /deploy-dev/shm
#tmpfs                              16G  1.6G   14G  11% /run
#tmpfs                              16G     0   16G   0% /sys/fs/cgroup
#/deploy-dev/sda2                         477M  146M  302M  33% /boot
#/deploy-dev/mapper/C1543466920I0-home    208G   61M  198G   1% /home <----
#overlay                           9.8G  4.3G  5.0G  47% /var/lib/docker/overlay2/300b703cb13e082a332edf96ce52297dc1b5fdbfefc9b3af64d9ebef3862bde0/merged
#shm                                64M     0   64M   0% /var/lib/docker/containers/0396c75a7663decc0de3f9365272d9da0f48a280fa0eb539b08d5ba8d791155f/mounts/shm
#tmpfs                              16G  8.0K   16G   1% /var/lib/docker/containers/0396c75a7663decc0de3f9365272d9da0f48a280fa0eb539b08d5ba8d791155f/mounts/secrets
#tmpfs                             3.2G     0  3.2G   0% /run/user/0

#dm.mountopt
#        -H unix:///var/run/docker-bootstrap.sock \
#        -p /var/run/docker-bootstrap.pid \

#sudo dockerd \
#  --iptables=false \
#  --bridge=none \
#  --data-root=/home/docker/volumes \
#  --exec-root=/home/docker/exec

#sudo dockerd -s overlay2 --storage-opt overlay2.size=128G --exec-root=/home/docker/exec --data-root=/home/docker/volumes
