#!/bin/bash

set -eox pipefail

docker pull rodstewart/twilio_apps:latest
docker rm twilio_apps -f
docker run --name twilio_apps -dit --restart unless-stopped -p 80:3000 rodstewart/twilio_apps:latest
