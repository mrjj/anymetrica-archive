# Inspired by: https://github.com/rjocoleman/docker-alpine-s3fs

# Use s3fs with Alpine Linux to mount an S3 bucket as a directory in the filesystem.
# Uses environment variables to configure.
#
# AWS_ACCESS_KEY_ID= # required unless IAM_ROLE is set
# AWS_SECRET_ACCESS_KEY= # required unless IAM_ROLE is set
# S3_ACL=private # default, optional
# S3_BUCKET=test-bucket # required
# S3_URL=https://s3.amazonaws.com # S3 Endpoint URL [optional]
# IAM_ROLE= # optional IAM role name, for usage on EC2.

# https://hub.docker.com/_/nginx
# Using environment variables in nginx configuration
# Out-of-the-box, nginx doesn't support environment variables inside most configuration blocks. But envsubst may be used as a workaround if you need to generate your nginx configuration dynamically before nginx starts.
#
# Here is an example using docker-compose.yml:
#
# web:
#   image: nginx
#   volumes:
#    - ./mysite.template:/etc/nginx/conf.d/mysite.template
#   ports:
#    - "8080:80"
#   environment:
#    - NGINX_HOST=foobar.com
#    - NGINX_PORT=80
#   command: /bin/bash -c "envsubst < /etc/nginx/conf.d/mysite.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
# The mysite.template file may then contain variable references like this:


FROM nginx:${NGINX_VERSION}-alpine AS base


# the following ENV need to be present
ARG NGINX_VERSION=1.15.8
ARG S3FS_VERSION=v1.84

ENV IAM_ROLE=none
ENV S3_URL=https://s3.amazonaws.com
ENV MOUNT_POINT=/var/s3

VOLUME /var/s3

RUN apk --update add fuse alpine-sdk automake autoconf libxml2-dev fuse-dev curl-dev git bash;
RUN git clone https://github.com/s3fs-fuse/s3fs-fuse.git; \
 cd s3fs-fuse; \
 git checkout tags/${S3FS_VERSION}; \
 ./autogen.sh; \
 ./configure --prefix=/usr; \
 make; \
 make install; \
 rm -rf /var/cache/apk/*;

COPY etc /etc/
COPY dockerscripts/docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
