#!/bin/bash

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

docker build --file "$SCRIPT_DIR/Dockerfile" --tag github-issues-viewer-be "$SCRIPT_DIR/.."
