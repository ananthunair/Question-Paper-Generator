LABEL=$1
tar --exclude='./tests' --exclude='./node_modules' --exclude='./README.md' --exclude='.gitignore' --exclude='./.git' --exclude='./devops' --exclude='./data' -cvf QPG-$LABEL.tar .