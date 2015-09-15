#!/usr/bin/env bash
rmdir node_modules/sqlite3/lib/binding/node-webkit-v0.11.6-darwin-x64
mkdir node_modules/sqlite3/lib/binding/node-webkit-v0.11.6-darwin-x64
cp node_modules/sqlite3/lib/binding/node-v14-darwin-x64/node_sqlite3.node node_modules/sqlite3/lib/binding/node-webkit-v0.11.6-darwin-x64/