#!/usr/bin/env bash
docker stop $(docker ps -aq) ; docker rm 0f $(docker ps -aq) ; docker rmi -f $(docker images -q) ; docker volume rm $(docker volume ls -q)
