const express = require('express');
const Users = require('./../models/login');
const jwt = require('jsonwebtoken');
const config = require('./../config/config.json');
const crypto = require('crypto');
const moment = require('moment');
var passport = require('passport');
var fs = require('fs');
var path = require('path');
var emailService = require('./../service/emailService.js');
var formidable = require('formidable');
var async = require('async');
var easyimg = require("easyimage");

function generateToken(email) {
    const token = config.token;
    let payload = {
        iss: 'my.domain.com',
        sub: email,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, token);
}

module.exports.abc = (req, res) => {
    let outputJSON = {};
    console.log("dsfsf", req.body)
    // let userDetails = req.body.userDetails;
    // if (req.body.loginType != null || req.body.loginType != undefined) {
    //     var loginType = req.body.loginType;
    // } else {
    //     var loginType = userDetails.loginType;
    // }

    let users = Users();
    // if (userDetails != null || userDetails != undefined) {
    //     let token = generateToken(userDetails.profile.U3);
    //     users.token = token;
    //     users.social_id = userDetails.profile.Eea;
    //     users.name = userDetails.profile.ig;
    // }

    // if (req.body.email == null || req.body.email == undefined) {
    //     users.email = userDetails.profile.U3;
    // } else {
    //     users.email = req.body.email;
    // }

    // if (req.body.password != null || req.body.password != undefined) {
    //     users.setPassword(req.body.password);
    // }

    //users.picture = userDetails.profile.Paa;

    if (req.body.loginType == 1) {//normal login
        users.email = req.body.email;
        users.setPassword(req.body.password);
        users.type = req.body.loginType;
    } else {//social login

    }

    Users.findOne({
        "email": users.email,
        "is_deleted": false
    }, function (eErr, eRes) {
        if (eRes != null || eRes != undefined) {
            if (eRes.type == 2 || eRes.type == 3) {
                outputJSON = {
                    'status': 400,
                    'msg': "User already registered with social account",
                    'data': eRes
                };
                res.status(200).send(outputJSON);
            } else {
                outputJSON = {
                    'status': 400,
                    'msg': "user already registered"
                };
                res.status(200).send(outputJSON);
            }
        } else {
            users.save(function (err, user) {
                if (user) {
                    outputJSON = {
                        'status': 200,
                        'msg': "Registered successfully",
                        'data': user
                    };
                    res.status(200).send(outputJSON);
                }
            });
        }
    });
}

exports.register = function (req, res) {
    
     var errorMessage = "";
     var outputJSON = "";
     var postModelObj = req.body;
 
     directory = "./public/media/industryAudio/";
     fs.exists(directory, function (exists) {
         if (!exists) {
             fs.mkdir(directory, function (err) {
                 if (err) {
                     res.send(500, err);
                 } else {
                     saveUser(req, res);
                 }
             });
         } else {
             saveUser(req, res);
         }
     });
     
 }
 
 var saveUser = function (req, res) {
     let _this = this;
     let form = new formidable.IncomingForm();
     form.keepExtensions = true; //keep file extension
     form.uploadDir = process.env.PWD + '/public/media/users';
     var dst_small= process.env.PWD + '/public/media/users/small';
     var dst_medium = process.env.PWD + '/public/media/users/medium';
     form.multiples = true;
     var arrfile = [];
     var multipleAudio = [];
     let users = new Users();
     form.parse(req, function (err, fields, files) {
       
             var arrfile = [];
                   var lastslashindex = files.file.path.lastIndexOf('/');
                   var imageName = files.file.path.substring(lastslashindex  + 1);
           
                   if (!Array.isArray(files.file)) {
                       arrfile.push(files.file);
                   } else {
                       arrfile = files.file;
                   }
                   var successData = [];
                   var i = 0;
                   var length = arrfile.length;
           
                   async.map(arrfile, (resp, icb) => {
                      
                       var myfile = resp.path.split('/');
                       
                       var fileType = resp.type;
                       fileType = fileType.split('/');

                    // for smallImage
                       easyimg.rescrop({
                        src: files.file.path, dst: dst_small + '/' + imageName,
                        width: 100, height: 100,
                        cropwidth: 100, cropheight: 100,
                        x: 0, y: 0
                    }).then(
                        function (image) {
                            //  console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                        },
                        function (err) {
                            //  console.log(err);
                        }
                        );
        
        
                    // for largeImage
                    easyimg.rescrop({
                        src: files.file.path, dst: dst_medium + '/' + imageName,
                        width: 300, height: 300,
                        cropwidth: 300, cropheight: 300,
                        x: 0, y: 0
                    }).then(
                        function (image) {
                            //  console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                            // return res.json({ status: 200, msg: 'Uploaded images', data: image });
        
                        },
                        function (err) {
                            return res.json({ status: 500, msg: err });
                        }
                        );
                      
                       var baseImageUrl = path.join('/media/users/small/', imageName);
           
                       fields.picture = baseImageUrl;
                     
                   })
                   Users.findOne({ email: fields.email }, function (err, resp) {
                       if (resp != null || resp != undefined) {
                           outputJson = {
                               status: 400,
                               message: "Email already exist",
                           }
                           return res.json(outputJson);
                       } else {
                           if (fields.password != null || fields.password != undefined) {
                               users.setPassword(fields.password);
                           }
                      
                         let generes = "'"+ fields.preferred_genre + "'";
                       
                           users.email = fields.email;
                           users.name = fields.name;
                           users.picture = fields.picture;
                           users.username = fields.username;
                           users.age = fields.age
                           users.gender = fields.gender;
                           users.type = fields.type;
                           users.token = fields.token;
                           users.preferred_genre = [fields.preferred_genre];
                          
                           users.save(function (saveErr, savedata) {
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
                   })
     })
 }
module.exports.login = function (req, res) {
    let users = new Users();
    let outputJSON = "";
   
    var type = req.body.type;
    passport.authenticate('local', function (err, user, info) {
        // If Passport throws/catches an error
          if (err) {
              
              res.status(404).json(err);
              return;
          }
          if (user) {
              
              var newtoken = user.generateJwt();
              var userId = user._id;
              user.token = newtoken;
             
                  Users.update({
                      email: req.body.email
                  }, {
                          $set: {
                              token: user.token,
                           }
                      }, {
                          "upsert": true,
                          "new": true
                      }, function (err, response) {
                          if (response) {
                              outputJSON = {
                                  'status': 200,
                                  'data': user
                              };
                              res.status(200).send(outputJSON);
                          }
                      })
           
          } else if (info.status == -1) {
  
              outputJSON = {
                  'status': 400,
                  'msg': "invalid credentials"
              };
              res.status(200).send(outputJSON);
          } else if (info.status == -2) {
  
              outputJSON = {
                  'status': 400,
                  'msg': "invalid credentials"
              };
              res.status(200).send(outputJSON);
          } else if (info.status == -3) {
  
              outputJSON = {
                  'status': 400,
                  'msg': "invalid credentials"
              };
              res.status(200).send(outputJSON);
          }
      }) (req, res);
};

module.exports.Weblogin = function (req, res) {
    let users = new Users();
    let outputJSON = "";
   
   // req.body= { email: req.body.data.email, password: req.body.data.password };
    // console.log("request=>",req)
    passport.authenticate('local', function (err, user, info) {
      
        // If Passport throws/catches an error
        if (err) {
            
            res.status(404).json(err);
            return;
        }
        if (user) {
            
            var newtoken = user.generateJwt();
            var userId = user._id;
            user.token = newtoken;
            // user.fcmToken = req.body.fcmToken;
            // user.deviceplatform = req.body.deviceplatform;
          
                Users.update({
                    email: req.body.email
                }, {
                        $set: {
                            token: user.token,
                            //fcmToken: user.fcmToken,
                            //deviceplatform: user.deviceplatform
                        }
                    }, {
                        "upsert": true,
                        "new": true
                    }, function (err, response) {
                        if (response) {
                            outputJSON = {
                                'status': 200,
                                'data': user
                            };
                            res.status(200).send(outputJSON);
                        }
                    })
           
            //}
        } else if (info.status == -1) {

            outputJSON = {
                'status': 400,
                'msg': "invalid credentials"
            };
            res.status(200).send(outputJSON);
        } else if (info.status == -2) {

            outputJSON = {
                'status': 400,
                'msg': "invalid credentials"
            };
            res.status(200).send(outputJSON);
        } else if (info.status == -3) {

            outputJSON = {
                'status': 400,
                'msg': "invalid credentials"
            };
            res.status(200).send(outputJSON);
        }
    })(req, res);
};


module.exports.checkSocialSignup = function (req, res) {
    let users = new Users();
    let outputJSON = "";

        Users.findOne({ social_id: req.body.userId, type: req.body.type}, function (err, resp) {
           
                if (resp != null || resp != undefined) {
                    outputJson = {
                        status: 200,
                        data: resp
                    }
                    return res.json(outputJson);
                        
                        
                } else {
                    outputJson = {
                        status: 201,
                        data: false
                    }
                    return res.json(outputJson);
                   
                }
            })
};

module.exports.SocialSignUp = function (req, res) {
    
    let users = new Users();
    let outputJSON = "";
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; //keep file extension
    form.parse(req, function (err, fields, files) {
       
        Users.findOne({ social_id: fields.userId}, function (err, resp) {
           
                if (resp != null || resp != undefined) {
                    outputJson = {
                        status: 200,
                        data: resp
                    }
                    return res.json(outputJson);
                        
                        
                } else {
                    var errorMessage = "";
                    var outputJSON = "";
                    var postModelObj = req.body;

                    var params ={
                        fields:fields,
                        files:files
                    } 
                    
                    saveSocialUser(params, res);
                
                    // directory = "./public/media/industryAudio/";
                    // fs.exists(directory, function (exists) {
                    //     if (!exists) {
                    //         fs.mkdir(directory, function (err) {
                    //             if (err) {
                    //                 res.send(500, err);
                    //             } else {

                    //                 var params ={
                    //                     fields:fields,
                    //                     files:files
                    //                 }
                    //                 saveSocialUser(params, res);
                    //             }
                    //         });
                    //     } else {
                    //             var params ={
                    //                 fields:fields,
                    //                 files:files
                    //             }
                    //             saveSocialUser(params, res);
                    //     }
                    // });
                }
            })
    })
    
};


var saveSocialUser = function (req, res) {
    
    let _this = this;
    let users = new Users();
    let files = req.files;
    let fields = req.fields;
    var uuidv4 = require('uuid/v4');
    var imageName = 'upload_'+ uuidv4() + '.png'

    var fs      = require('fs');
    var request = require('request');
    request.get({url: fields.file, encoding: 'binary'}, function (err, response, body) {
    fs.writeFile(process.env.PWD + '/public/media/users/'+imageName, body, 'binary', function(err) {
    if(err)
    {
        outputJson = {
                              status: 400,
                              message: err,
                     }
                          return res.json(outputJson);
    }
    else
    {
        var picture = "/media/users/"+imageName;

                          Users.findOne({ email: fields.email }, function (err, resp) {
                              if (resp != null || resp != undefined) {
                                  outputJson = {
                                      status: 400,
                                      message: "Email already exist",
                                  }
                                  return res.json(outputJson);
                              } else {
                                  if (fields.password != null || fields.password != undefined) {
                                      users.setPassword(fields.password);
                                  }
                             
                                let generes = "'"+ fields.preferred_genre + "'";
                         
                                  users.email = fields.email;
                                  users.email = fields.email;
                                  users.name = fields.name;
                                  users.picture = picture;
                                  users.username = fields.username;
                                  users.type = fields.type;
                                  users.token = fields.token;
                                  users.social_id= fields.userId;
                                 
                                  users.save(function (saveErr, savedata) {
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
                          })

                 }
    }); 
});

                        
}

exports.editAccount = function (req, res) {
    
    var errorMessage = "";
    var outputJSON = "";
    var postModelObj = req.body;
    let _this = this;
   
                        let form = new formidable.IncomingForm();
                        form.keepExtensions = true; //keep file extension
                        form.uploadDir = process.env.PWD + '/public/media/users';
                        form.multiples = true;
                        var arrfile = [];
                        var multipleAudio = [];
                        let users = new Users();
                        form.parse(req, function (err, fields, files) {
                            var arrfile = [];
                          
                         if(Object.keys(files).length == 0) 
                           {
                            updateUser(fields, res);
                           }
                           else
                           {
                            var lastslashindex = files.file.path.lastIndexOf('/');
                            var imageName = files.file.path.substring(lastslashindex  + 1);
                    
                            if (!Array.isArray(files.file)) {
                                arrfile.push(files.file);
                            } else {
                                arrfile = files.file;
                            }
                            var successData = [];
                            var i = 0;
                            var length = arrfile.length;
                    
                            async.map(arrfile, (resp, icb) => {
                               
                                var myfile = resp.path.split('/');
                                
                                var fileType = resp.type;
                                fileType = fileType.split('/');
                               
                                var baseImageUrl = path.join('/media/users/', imageName);
                    
                                fields.picture = baseImageUrl;

                                updateUser(fields, res);
                            })

                           }
                            
                        })

}


var updateUser = function (req, res) {

    if(req.picture)
    {
        var profileReq = {
            name: req.name,
            username: req.username,
            picture: req.picture,
            genre: req.genre,
            charge: req.charge,
            subscription: req.subscription
        }
    }
    else{
        var profileReq = {
            name: req.name,
            username: req.username,
            genre: req.genre,
            charge: req.charge,
            subscription: req.subscription
        }
    }
    
    Users.update({
        _id: req.fieldId
    }, {

            $set: profileReq
        },
        function (err, resp) {
            
            if (resp) {

                Users.find({ _id: req.fieldId }, function (err, resp) {
                    if (err) {
                        outputJson = {
                            status: 400,
                            msg: "something went wrong"
                        }
                        res.status(outputJSON.status).send(outputJSON);
            
                    } else {
                        outputJSON = {
                            status: 200,
                            message: "Profile updated Successfully.",
                            data: resp
                        };
                        res.status(outputJSON.status).send(outputJSON);
            
                    }
                })
               
               
            } else {
                outputJSON = {
                    status: 404,
                    message: err
                };
                res.status(outputJSON.status).send(outputJSON);
            }
        });
}

module.exports.findUser = (req, res) => {
    let id = req.params.id;
    Users.findOne({
        _id: id,
        is_deleted: false
    }, (err, resp) => {
        if (resp) {
            outputJSON = {
                status: 200,
                data: resp
            }
            res.status(200).send(outputJSON)
        }
        else {
            outputJSON = {
                status: 201,
                msg: 'User not found'
            }
            res.status(201).send(outputJSON)
        }
    })
}

module.exports.validateUser = (req, res) => {
   
    let email = req.params.email;
  
    Users.findOne({
        'email': email,
        is_deleted: false
    }, (err, resp) => {
        if (resp) {

            outputJSON = {
                status: 200,
                data: resp
            }
            res.status(200).send(outputJSON)
        }
        else {
            outputJSON = {
                status: 201,
                msg: 'User not found'
            }
            res.status(201).send(outputJSON)
        }
    })
    (req, res);
}

module.exports.VerifyUser = (req, res) => {
  
     Users.findOne({
         $or: [ { 'email': req.body.name  }, { 'username': req.body.name }],

         is_deleted: false
     }, (err, resp) => {
         if (resp) {
 
             outputJSON = {
                 status: 200,
                 data: resp
             }
             res.status(200).send(outputJSON)
         }
         else {
             outputJSON = {
                 status: 201,
                 data: false
             }
             res.status(201).send(outputJSON)
         }
     })
    
 }

module.exports.forgot = function (req, res) {
    Users.findOne({
        email: req.body.email,
        is_deleted: false
    }, function (err, rec) {
        if (rec) {
            
            var token = rec.generateJwt();
            rec.resetPasswordToken = token;
            rec.resetPasswordExpires = Date.now() + 3600000;
            rec.save(function (err, resp) {
                console.log("rec", resp);
            });

            let userDetails = {};
            userDetails.email = req.body.email;
            userDetails.firstname = rec.name;
            // userDetails.app_link = '<a href= "'+ constantObj.baseUrl +'/#/access/resetpassword?' + token + '" style="background-color:#2b934f;color:#ffffff;display:inline-block;font-family:Helvetcia, sans-serif;font-size:16px;font-weight:light;line-height:40px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;"> click here </a>';
            let frm = 'Iamtheindustry<noreply@Iamtheindustry>';
            let emailSubject = 'Iamtheindustry password reset link';
            let emailTemplate = 'password-reset.html';

            emailService.send(userDetails, emailSubject, emailTemplate, frm);
            res.json({
                status: 200,
                //token: token

            });
        } else {
            res.json({
                error: "user not found",
                status: 400
            });
        }
    });
}

module.exports.logout = (req, res) => {
    let email = req.params.email;
    Users.update({
        "email": email
    }, {
            $set: {
                "token": ""
            }
        }, (err, resp) => {
            if (resp) {
                outputJSON = {
                    status: 200,
                    data: resp
                }
                res.status(200).send(outputJSON)
            }
            else {
                outputJSON = {
                    status: 201,
                    msg: 'Can not logout'
                }
                res.status(201).send(outputJSON)
            }
        })
}

module.exports.updatePassword = (req, res) => {
   let userInfo = req.body.userInfo;
   let password = userInfo.password;
   let user_id = userInfo.user_id;
   let salt = crypto.randomBytes(16).toString('hex');
   let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1').toString('hex');
    Users.update({
        "_id": user_id
    }, {
            $set: {
                "salt":salt,
                "hash":hash
            }
        }, (err, resp) => {
            if (resp) {
                outputJSON = {
                    status: 200,
                    data: resp
                }
                res.status(200).send(outputJSON)
            }
            else {
                outputJSON = {
                    status: 201,
                    msg: 'Error in  updating !!'
                }
                res.status(201).send(outputJSON)
            }
        })
}
