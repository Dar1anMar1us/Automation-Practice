#!/bin/sh -l

set -e

your_name=$1

echo "Performing some action with GitHub\n"

time=$(date)
message="Hello: $your_name, the time is $time"

echo "message=$message" >> $GITHUB_OUTPUT