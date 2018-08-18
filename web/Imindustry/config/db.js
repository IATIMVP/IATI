/*
 * Database connectivity
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://iaminindustry:iaminindustry@192.168.0.5:27017/iaminindustry',{ useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/Imindustry',{ useNewUrlParser: true });
//mongoose.connect('mongodb://192.168.0.5:27017/iaminindustry',{ useNewUrlParser: true });

//check if we are connected successfully or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

module.exports = db;
