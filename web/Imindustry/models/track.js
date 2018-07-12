var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackSchema = new mongoose.Schema({
    title: { type: String },
    genre: { type: String },
    icon: { type: String },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_date: { type: Date, default: Date.now },
    track_audio: {
        type: Array
    }
});



trackSchema.statics.viewTrackList1 = function (callBack) {
    this.find({
        isDeleted: false,
    }, function (err, res) {
        if (!res) return callBack(null, null);
        callBack(null, res);
    });
}


var trackObj = mongoose.model('track', trackSchema);
module.exports = trackObj;