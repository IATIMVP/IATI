var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var LikeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  created: {
    type: Date,
    default: Date.now
  },
});


var CommentSchema = new Schema({
  comment: {
    type: String
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

var postSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  genre: { type: String },
  age: { type: Number },
  creator: { type: Schema.Types.ObjectId, ref: 'users' },
  gender: { type: String },
  genre_type: { type: String },
  likes_count: { type: Number, min: 0 },
  likes: [LikeSchema],
  comments_count: { type: Number, min: 0 },
  comments: [CommentSchema],
  userliked: { type: Boolean, default: false },
  userfavourite: { type: Boolean, default: false },
  icon: { type: String },
  video: { type: String },
  privacy: { type: String },
  charge: { type: String},
  created_date: { type: Date, default: Date.now },
  music_audio: {
    type: Array
  },
   user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
  is_deleted: {
    type: Boolean,
    default: false
}
});


postSchema.statics.viewAudioList1 = function (callBack) {
  this.find({
    isDeleted: false,
  }, function (err, res) {
    if (!res) return callBack(null, null);
    callBack(null, res);
  });
}


var postObj = mongoose.model('post', postSchema);
module.exports = postObj;