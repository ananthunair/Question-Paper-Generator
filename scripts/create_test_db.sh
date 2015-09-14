#!/usr/bin/env bash

rm -rf tests/data/question_bank.db
rmdir tests/data
echo "databases removed"
mkdir tests/data
echo "initializing test db"
node scripts/initialize_db.js tests/data/question_bank.db