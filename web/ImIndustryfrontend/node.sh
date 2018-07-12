rm -rf node_modules
rm -rf dist
npm install
ng build
cd dist
#pm2 stop /usr/bin/http-server -- -p 4148 -d false
pm2 delete all
pm2 start /usr/bin/http-server -- -p 4174 -d false
