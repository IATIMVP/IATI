pm2 stop all
PORT=4173 MONGO_URL='mongodb://Imindustry:Imindustry2780@localhost:27017/Imindustry' 
pm2 start bin/www --name="iamtheindustry-api"