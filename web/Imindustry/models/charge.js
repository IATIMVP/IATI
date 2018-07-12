let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let chargeSchema = new mongoose.Schema({
    
    created_date: { type: Date, default: Date.now },
    modified_date: { type: Date },
    title: { type: String },
    is_deleted: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true }

});
let chargeObj = mongoose.model('charges', chargeSchema);
module.exports = chargeObj;