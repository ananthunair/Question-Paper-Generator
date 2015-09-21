#!/usr/bin/env bash
echo "installing dependencies"
npm install
echo "initialize database"
npm run init_db
echo "Making necessary changes"
sh scripts/binary_rename.sh
