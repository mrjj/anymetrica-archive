#!/usr/bin/env bash
set -ex

IMAGE=$1

echo '${IMAGE} -> /var/run/image.tar'
docker save ${IMAGE} > /var/run/image.tar
echo "removing docker ${IMAGE}"
docker image rm -f ${IMAGE}
echo 'squashing /var/run/image.tar -> /var/run/image-squashed.tar'
docker-squash -i /var/run/image.tar -o /var/run/image-squashed.tar -t ${IMAGE}
echo "removing /var/run/image.tar"
rm -f /var/run/image.tar
echo "loading /var/run/image-squashed.tar"
cat /var/run/image-squashed.tar | docker load
echo "tagging back: ${IMAGE}"
docker images ${IMAGE}
echo "removing /var/run/image-squashed.tar"
rm -f /var/run/image-squashed.tar
echo "Done!"

