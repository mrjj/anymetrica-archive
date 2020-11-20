#!/bin/bash
set -e

#systemctl restart unit.service
command=`cat /usr/src/app/unit.json`
curl -X PUT --data-binary "${command}" --unix-socket /run/control.unit.sock 'http://localhost/config/applications/anymetrica-unit'

exec "$@"



