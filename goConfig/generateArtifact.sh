LABEL=$1
tar --exclude='./tests' --exclude='./node_modules' --exclude='./README.md' --exclude='.gitignore' --exclude='./.git' --exclude='runUnitTests.sh'  --exclude='./goConfig' -cvf QPG-$LABEL.tar .