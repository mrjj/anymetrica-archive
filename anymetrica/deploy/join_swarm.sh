#!/usr/bin/env bash

set -x

#. ./swarm_env.sh
. ./deployment/stage/swarm_env.sh

# Deploy minio
echo "${MINIO_ACCESS_KEY_ID}" ~/.ssh/id_rsa.pub | ssh root@${SWARM_MASTER_IP} "docker secret create access_key -"
echo "${MINIO_SECRET_ACCESS_KEY}" ~/.ssh/id_rsa.pub | ssh root@${SWARM_MASTER_IP} "docker secret create secret_key -"

# Deploy service
scp ./deployment/stage/docker-compose.yaml root@${SWARM_MASTER_IP}:/var/opt
ssh root@${SWARM_MASTER_IP} "docker stack deploy --compose-file=/var/opt/docker-compose.yaml anymetrica_stack"

# Local client setip
mc config host add stage http://${MINIO_MASTER_IP} ${MINIO_ACCESS_KEY_ID} ${MINIO_SECRET_ACCESS_KEY} --api S3v4


# Join swarm
export SWARM_JOIN_TOKEN_MANAGER=`./cat swarm-join-token-manager`
export SWARM_MASTER_HOST="${SWARM_MASTER_IP}:2377"

pssh -v -h ./deployment/stage/hosts -l root -i -t 5 -x "-oStrictHostKeyChecking=no -i ~/.ssh/id_rsa" "if [[ ! \$(docker info | grep 'Swarm: active') ]]; then docker swarm join --token ${SWARM_JOIN_TOKEN_MANAGER} ${SWARM_MASTER_HOST}; fi"
