#!/bin/bash

#

sed -i 's/${RTB_BOT_TOKEN}/'${RTB_BOT_TOKEN}/ /app/config.json
sed -i 's/${TOKEN_LOCALIZATION}/'${TOKEN_LOCALIZATION}/ /app/config.json

/usr/bin/redis-server --bind '0.0.0.0' --daemonize yes
sleep 5
node /app/real-time-bot.js
