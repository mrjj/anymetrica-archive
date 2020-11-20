#!/usr/bin/env bash

INPUT_DIR=$1
OUTPUT_DIR=$2
docker run --rm -i \
    --volume=${INPUT_DIR}:/input \
    --volume=${OUTPUT_DIR}:/output \
    -t anymetrica/webrtc-vad:alpine
