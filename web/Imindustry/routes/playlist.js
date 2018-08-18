const express = require('express');
const playlistRoutes = express.Router();

var userPlaylist = require('./../controllers/playlist');
var auth = require('../auth/auth');


playlistRoutes.post('/create_playlist', (req, res) => {
    userPlaylist.create(req, res);
})

playlistRoutes.post('/add_music', (req, res) => {
    userPlaylist.addMusic(req, res);
})


playlistRoutes.post('/get_music', (req, res) => {
    userPlaylist.getMusic(req, res);
})


playlistRoutes.post('/search', (req, res) => {
    userPlaylist.searchMusic(req, res);
})
module.exports = playlistRoutes;