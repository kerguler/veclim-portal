#!/bin/bash

source .env

docker build --build-arg REACT_APP_PORT=${REACT_APP_PORT} \
             -t veclim-portal \
             .
docker run -d \
           -p ${REACT_APP_PORT}:${REACT_APP_PORT} \
           --restart always \
           --name veclim-portal \
           -v ${REACT_APP_DIR_EXT}:${REACT_APP_DIR_INT} \
           veclim-portal