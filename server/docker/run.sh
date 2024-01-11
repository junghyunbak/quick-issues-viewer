#!/bin/bash

BE_IMAGE_NAME=github-issues-viewer-be

docker run --detach --publish 3001:3001 --name ${BE_IMAGE_NAME} ${BE_IMAGE_NAME}