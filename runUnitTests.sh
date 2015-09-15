touch ~/.bash_profile
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
source ~/.bash_profile
nvm install 4.0
export PATH=$PATH:~/.nvm/versions/node/v4.0.0/bin
npm install
npm test
tar --exclude='./tests' --exclude='./node_modules' --exclude='./README.md' --exclude='.gitignore' --exclude='./.git' --exclude='runUnitTests.sh'  -cvf QPG.tar .