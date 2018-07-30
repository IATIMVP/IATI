const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const Users = mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: ""
    },
    username: {
        type: String,
        required: false,
        default: ""
    },
    age: { type: Number },
    gender: { type: String },
    preferred_genre:  [{
       type: String
        
    }
    ],
    social_id: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: false,
        default: ""
    },
    picture: {
        type: String,
        required: false,
        default: ""
    },
    token: {
        type: String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    hash: String,
    salt: String,
    subscription: {
        type: String,
        default: 0
    },
    charge: {
        type: String,
        default: 0
    },
    address: {
        type: String,
        default: 0
    },
    address1: {
        type: String,
        default: 0
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    modified_date: {
        type: Date,
        default: Date.now()
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user'
    },
    type: String, //1-normal,2-facebook,3-google
    social_id: String 
});

Users.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

Users.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
};

Users.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    var token = jwt.sign({
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET");
    return token;
};

Users.methods.verifyToken = function (token, cb) {
    jwt.verify(token, secret.secret, function (err, dcode) {
        if (err) {
            cb(false);
        }
        else {
            cb(dcode);
        }
    })
}

module.exports = mongoose.model('users', Users);