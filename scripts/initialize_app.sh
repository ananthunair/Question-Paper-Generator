#!/usr/bin/env bash
echo "installing dependencies"
npm install
echo "installing mongo"
sh scripts/steup_db.sh
