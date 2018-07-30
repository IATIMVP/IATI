const express = require('express');
const userRoutes = express.Router();
var userAuth = require('./../controllers/login');
var userPost = require('./../controllers/createpost');
var userTrack = require('./../controllers/tracks');
var auth = require('../auth/auth');


userRoutes.post('/usersignup', (req, res) => {
    userAuth.register(req, res);
})

userRoutes.post('/userlogin',function (req, res) {
   
   userAuth.login(req, res);
})

userRoutes.post('/weblogin',function (req, res) {
  
    req.body= { email: req.body.data.email, password: req.body.data.password };
    userAuth.Weblogin(req, res);

 })

 userRoutes.post('/socialSignup',function (req, res) {

      userAuth.SocialSignUp(req, res);
  
})

userRoutes.post('/checkSocialSignup',function (req, res) {
    
          userAuth.checkSocialSignup(req, res);
})

userRoutes.get('/userdetails/:id', (req, res) => {
    userAuth.findUser(req, res);
})


userRoutes.get('/validateUser/:email', (req, res) => {
    userAuth.validateUser(req, res);
})

userRoutes.post('/checkUser', (req, res) => {
    userAuth.VerifyUser(req, res);
})

userRoutes.post('/create', (req, res) => {
    userPost.create(req, res);
})

userRoutes.post('/trackCreate', (req, res) => {
    userTrack.trackCreate(req, res);
})

userRoutes.post('/updateTrack', (req, res) => {
    userTrack.updateTrack(req, res);
})


userRoutes.post('/forgot', (req, res) => {
    userAuth.forgot(req, res);
})

userRoutes.post('/updatePost', (req, res) => {
    userPost.updatePost(req, res);
})

userRoutes.get('/genrelist/:pageNo', (req, res) => {
    userPost.genreList(req, res);
})

userRoutes.get('/getgenrelist', (req, res) => {
    userPost.getgenrelist(req, res);
})

userRoutes.get('/getpostsList/:id',  (req, res) => {
    userPost.getpostsList(req, res);
})

userRoutes.get('/getPostDetail/:id',function (req, res) {
    userPost.getPostData(req, res);
})

userRoutes.get('/deletePost/:id',  (req, res) => {
    userPost.deletePost(req, res);
})

userRoutes.get('/subscriptions', (req, res) => {
    userPost.subscriptions(req, res);
})

userRoutes.get('/gettypeslist', (req, res) => {
    userPost.gettypeslist(req, res);
})

userRoutes.post('/creategenrelist', (req, res) => {
    userPost.creategenrelist(req, res);
})

userRoutes.post('/editAccount', (req, res) => {
    userAuth.editAccount(req, res);
})

userRoutes.post('/deletePost', (req, res) => {
    userPost.deletePost(req, res);
})

userRoutes.get('/logout/:email', (req, res) => {
    userAuth.logout(req, res);
})
userRoutes.post('/edit_post', (req, res) => {
    userPost.edit_post(req, res);
})

userRoutes.post('/updatePassword', (req, res) => {
    userAuth.updatePassword(req, res);
})



module.exports = userRoutes;