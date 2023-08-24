#!/bin/bash

BASE_URL="http://${HOST}"
INCOMING_API_URL="${API_URL}/IncomingPhoneNumbers"

echo $INCOMING_API_URL

declare -A numbers=(
  ["+1269BakerSt"]="call/baker"
  ["+191Freebird"]="call/freebird"
  ["+1662GetItOn"]="call/getiton"
  ["+1660DeepTht"]="ivr/welcome"
)

post_voice_url() {
  local phone_number="$1"
  local voice_url="${BASE_URL}/$2"
  local sid=$(curl -s -XPOST "${INCOMING_API_URL}.json" --data-urlencode "PhoneNumber=$phone_number" -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN | jq -r .sid)
  curl -s -XPOST "${INCOMING_API_URL}/${sid}.json" --data-urlencode "VoiceUrl=${voice_url}" -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
}

for key in ${!numbers[@]}; do
  post_voice_url $key ${numbers[$key]}
done