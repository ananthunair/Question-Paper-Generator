#!/usr/bin/env bash
rm -rf data/question_bank.db
rmdir data
echo "-------------->databases removed"
mkdir data
echo "------------->>>initializing database"
node scripts/initialize_db.js data/question_bank.db