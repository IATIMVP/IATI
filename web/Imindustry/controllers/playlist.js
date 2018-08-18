const express = require('express');
const Playlist = require('./../models/playlist');
const config = require('./../config/config.json');
const moment = require('moment');
var passport = require('passport');

exports.create = function (req, res) {
  var data = req.body;
  let playlists = new Playlist();

  playlists.name = data.name;
  playlists.user_id = data.user_id;
  playlists.description = data.description;
 
  playlists.save(function (saveErr, savedata) {
      if (saveErr) {
          outputJson = {
              status: 400,
              message: saveErr,
          }
          return res.json(outputJson);
      } else {
          outputJson = {
              status: 200,
              data: savedata,
          }
          return res.json(outputJson);
      }
  })
   
}

exports.addMusic = function (req, res) {
   
    var data = req.body ? req.body : {};
    var playlist_id = data.playlist_id;
    var musicObject = data.music;

    if (playlist_id) {
        Playlist.findOneAndUpdate({ _id: playlist_id }, { $push: { "music": musicObject } }, { new: true }, function (err, playlist) {
            if (err) {
                res.json({ status: 500, msg: 'unable to add music', error: err });
            }
            else {
                res.json({ status: 200, msg: 'music added', data: playlist });
            }
        })

    }
    else {
        res.json({ status: 404, msg: 'playlist not found' });
    }
  }


  exports.getMusic = function (req, res) {
   
    var data = req.body ? req.body : {};
    var playlist_id = data.playlist_id;
   
    if (playlist_id) {
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


