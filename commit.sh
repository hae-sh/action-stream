#!/bin/bash

curl -X POST -H "Content-Type: application/json" \
    -h "'$HAESH_STREAM_HEADER_NAME': '$HAESH_STREAM_HEADER_VALUE"
    -d '{"sha":"'$GITHUB_SHA'", "ref":"'$GITHUB_REF'"}' \
    https://api.dice.staging.hae.sh/streams/$HAESH_STREAM_ID