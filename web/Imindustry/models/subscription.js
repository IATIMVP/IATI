let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let subscriptionSchema = new mongoose.Schema({
    name: { type: String },
    //category: { type: Array },
    created_date: { type: Date, default: Date.now },
    modified_date: { type: Date },
    amount: { type: Number, default: 0 },
    title: { type: String },
    is_deleted: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true }

});
let subscriptionObj = mongoose.model('subscriptions', subscriptionSchema);
module.exports = subscriptionObj;