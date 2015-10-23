LABEL=$1

zip -r app.nw *
mv app.nw node_modules/nodewebkit/nodewebkit/node-webkit.app/Contents/Resources/
mkdir -p QPG.app
cp -r node_modules/nodewebkit/nodewebkit/node-webkit.app/* QPG.app/
rm -rf node_modules/nodewebkit/nodewebkit/node-webkit.app/Contents/Resources/app.nw
zip -r QPG-$LABEL.app QPG.app/*
rm -rf QPG.app