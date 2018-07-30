const express = require('express');
const Playlist = require('./../models/playlist');
const config = require('./../config/config.json');
const moment = require('moment');
var passport = require('passport');

  exports.searchMusic = function (req, res) {
   
    var data = req.body ? req.body : {};
    var keyword = data.keyword;
   
    if (keyword) {
        Playlist.findOne({ _id: playlist_id }, function (err, resp) {
            if (err) {
                res.json({ status: 500, msg: 'unable to add music', error: err });
            }
            else {
                res.json({ status: 200,data: resp });
            }
        })

    }
    else {
        res.json({ status: 404, msg: 'playlist not found' });
    }
  }


