#!/bin/bash

curl --request POST \
    --header "Content-Type: application/json" \
    --header "'$HAESH_STREAM_HEADER_NAME': '$HAESH_STREAM_HEADER_VALUE'" \
    --data '{"sha":"'$GITHUB_SHA'", "ref":"'$GITHUB_REF'"}' \
    --url https://api.dice.staging.hae.sh/streams/$HAESH_STREAM_ID