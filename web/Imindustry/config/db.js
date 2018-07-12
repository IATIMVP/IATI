/*
 * Database connectivity
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://Imindustry:Imindustry2780@localhost:27017/Imindustry');
mongoose.connect('mongodb://localhost:27017/Imindustry',{ useNewUrlParser: true });


//check if we are connected successfully or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

module.exports = db;
