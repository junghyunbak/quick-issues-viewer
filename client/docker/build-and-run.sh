#!/bin/bash

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

FE_IMAGE_NAME=github-issues-viewer-fe

docker build --file "$SCRIPT_DIR/Dockerfile" --tag ${FE_IMAGE_NAME} "$SCRIPT_DIR/.."

docker rm --force ${FE_IMAGE_NAME}

docker run --detach --publish 3000:3000 --name ${FE_IMAGE_NAME} ${FE_IMAGE_NAME}