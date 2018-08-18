let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let playlistSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    created_date: { type: Date, default: Date.now },
    modified_date: { type: Date },
    name: { type: String},
    description: { type: String},
    music: [
        {
            link: {
                type: String
            },
            image: {
                type: String
            },
            type:{
                type: String
            }
        }
    ],
    is_deleted: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true }

});
let playlistObj = mongoose.model('playlists', playlistSchema);
module.exports = playlistObj;