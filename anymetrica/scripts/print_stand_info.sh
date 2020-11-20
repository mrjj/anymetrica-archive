#!/usr/bin/env bash

DARK_GREEN='\033[0;32m'
GREEN='\033[1;32m'
DARK_RED='\033[0;31m'
RED='\033[1;31m'
NC='\033[0m' # No Color
SLEEP_TIME_SEC=${1:-5}

printf "${DARK_GREEN}Waiting ${SLEEP_TIME_SEC} seconds before test stand info output...${NC}\n"

sleep "${SLEEP_TIME_SEC}"

printf "${GREEN}===========================================================${NC}\n"
printf "  Test stand:\n"
printf "     ${RED}http${DARK_RED}://${RED}127.0.0.1${DARK_RED}:${RED}${ANYMETRICA_DEV_HTTP_PORT:-8000}${NC}\n"
printf "    ${RED}https${DARK_RED}://${RED}127.0.0.1${DARK_RED}:${RED}${ANYMETRICA_DEV_HTTPS_PORT:-8443}${NC}\n"
printf "${GREEN}===========================================================${NC}\n"
