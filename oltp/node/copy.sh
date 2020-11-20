#!/bin/bash
set -e
set -x
export CACHE_DIR=${CACHE_DIR:-/home/node/cache}
export APP_DIR=${APP_DIR:-/home/node/app}

export GIT_REPO=${GIT_REPO:-$GIT_REPO}

if [[ ! -z "${GIT_REPO}" ]] ; then
    git clone "${GIT_REPO}" "${APP_DIR}"
else
    rm -rf "${CACHE_DIR}"/node_modules
    mv -f "${CACHE_DIR}" "${APP_DIR}"
fi
