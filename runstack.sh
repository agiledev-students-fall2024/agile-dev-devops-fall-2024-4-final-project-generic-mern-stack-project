#!/bin/sh

#Stop existing docker compose stack if it is running
docker compose down

#Start the stack
docker compose up -d --build
