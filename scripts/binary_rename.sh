#!/usr/bin/env bash

if [[ "$OSTYPE" == "msys" ]]; then
        replacer='node-webkit-v0.11.6-win32-x64'
else
        replacer='node-webkit-v0.11.6-darwin-x64'
fi

rm -rf node_modules/sqlite3/lib/binding/$replacer
mkdir -p node_modules/sqlite3/lib/binding/$replacer
cd node_modules/sqlite3/lib/binding/
orginal_dir=$(find . -type d -maxdepth 1 -print | grep 'node-v' | head -n1)
cp $orginal_dir/node_sqlite3.node $replacer
