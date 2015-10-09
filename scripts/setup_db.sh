brew install mongodb

ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents

launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist

mongod --config /usr/local/etc/mongod.conf