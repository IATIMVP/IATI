let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let typesSchema = new mongoose.Schema({
    name: { type: String },
    //category: { type: Array },
    created_date: { type: Date, default: Date.now },
    modified_date: { type: Date },
    selected: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true }

});
let typesObj = mongoose.model('types', typesSchema);
module.exports = typesObj;