LABEL=$1

zip -r app.nw *
mv app.nw node_modules/nodewebkit/nodewebkit/node-webkit.app/Contents/Resources/
mkdir -p QPG.app
cp -r node_modules/nodewebkit/nodewebkit/node-webkit.app/* QPG.app/
zip -r QPG-$LABEL.app QPG-LABEL.app/*