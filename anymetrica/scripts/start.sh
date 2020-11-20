#!/usr/bin/env bash
$(docker swarm init --advertise-addr $(ipconfig getifaddr en0) || true)&& docker stack deploy -c ./docker-compose.yaml anymetrica
