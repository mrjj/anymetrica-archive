#!/bin/bash
set -e

PORT_WAIT_TIME_SEC=30
RETRIES_MAX=16

echo "Starting AgensGraph 2.1.0 server and waiting for server on localhost:5432 for ${PORT_WAIT_TIME_SEC} seconds..."
ag_ctl start
#/home/agens/scripts/wait-for.sh 0.0.0.0:5432 -t 30
#echo "port allocated."
sleep 5
#until agens -h 0.0.0.0 -p 5432 -U agens -d agens -c "select 1" || [[ ${RETRIES_MAX} -eq 0 ]]; do
#  echo "Waiting 1 second to probe server again, $((RETRIES_MAX--)) attempts left..."
#  sleep 1
#done
echo "AgensGraph 2.1.0 server is ready to server requests."

exec "$@"
