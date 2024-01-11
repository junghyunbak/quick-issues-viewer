#!/bin/bash

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

BE_IMAGE_NAME=github-issues-viewer-be

docker build --file "$SCRIPT_DIR/Dockerfile" --tag ${BE_IMAGE_NAME} "$SCRIPT_DIR/.."

docker rm --force ${BE_IMAGE_NAME}

docker image prune --force

docker run --detach --publish 3001:3001 --name ${BE_IMAGE_NAME} ${BE_IMAGE_NAME}