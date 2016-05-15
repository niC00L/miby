#!/bin/bash
export PORT=3001
export PATH="$PATH:../node/bin"
export DEBUG=miby-server:*
export NODE_ENV=production
screen -Sdm miby npm start
