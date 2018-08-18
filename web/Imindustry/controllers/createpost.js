const express = require('express');
const postSchema = require('./../models/createpost');
const userSchema = require('./../models/login');
const GenreSchema = require('./../models/genre');
const SubscriptionSchema = require('./../models/subscription');
const TypesSchema = require('./../models/types');
const config = require('./../config/config.json');
const moment = require('moment');
var passport = require('passport');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var async = require('async');
let allowedFiles = ['.doc', '.docx', '.XLS', '.XLSX', '.xls', '.xlsx', '.png', '.PNG', '.pdf', '.PDF', '.JPG', '.JPEG', '.jpg', '.jpeg'];


// exports.create = function (req, res) {
//     var errorMessage = "";
//     var outputJSON = "";
//     var postModelObj = req.body;
//     // let _this = this,
//     directory = "./public/media/industryAudio/";
//     fs.exists(directory, function (exists) {
//         if (!exists) {
//             fs.mkdir(directory, function (err) {
//                 if (err) {
//                     res.send(500, err);
//                 } else {
//                     savePost(req, res);
//                 }
//             });
//         } else {
//             savePost(req, res);
//         }
//     });
// }

// var uploadCatImg = function (data, callback) {
//     if (data.image.indexOf("base64,") != -1) {
//         var Data = data.image.split('base64,');
//         var content = Data[0].split(':');
//         var contentType = content[1];
//         var content = contentType.split('/');
//         var base64Data = Data[1];
//         var base64Data = base64Data;
//     } else {
//         var base64Data = data.image.base64;
//     }
//     var photoname = data._id + '_' + Date.now() + ".png";
//     var buf = new Buffer(data.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
//     var data1 = {
//         Key: 'categoryImages/' + photoname,
//         Body: buf,
//         ContentEncoding: 'base64',
//         ContentType: contentType,
//         ACL: 'public-read'
//     };
// }

// var savePost = function (req, res) {
//     let _this = this;
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true; //keep file extension
//     form.uploadDir = process.env.PWD + '/public/media/industryAudio';
//     form.multiples = true;
//     var arrfile = [];
//     var multipleAudio = [];

//     form.parse(req, function (err, fields, files) {
//         var arrfile = [];
//         if (!Array.isArray(files.file)) {
//             arrfile.push(files.file);
//         } else {
//             arrfile = files.file;
//         }
//         var successData = [];
//         var i = 0;
//         var length = arrfile.length;
//         async.map(arrfile, (resp, icb) => {
//             var myfile = resp.path.split('/');
//             console.log(myfile);
//             var fileType = resp.type;
//             fileType = fileType.split('/');
//             var fileName = resp.name;
//             var baseImageUrl = path.join(__dirname + '/../public/media/industryAudio/', fileName);
//             if (fileType[0] == 'audio') {
//                 fields.music_audio = myfile[myfile.length - 1];
//                 multipleAudio.push(fields.music_audio);
//             } else if (fileType[0] == 'image') {
//                 fields.icon = myfile[myfile.length - 1];
//             } else {
//                 outputJson = {
//                     status: 400,
//                     message: "File is not valid. Please select valid file.",
//                 }
//                 return res.json(outputJson);
//             }

//         })
//         fields.music_audio = multipleAudio;
//         postSchema(fields).save(fields, function (saveErr, savedata) {
//             if (saveErr) {
//                 outputJson = {
//                     status: 400,
//                     message: saveErr,
//                 }
//                 return res.json(outputJson);
//             } else {
//                 outputJson = {
//                     status: 200,
//                     data: savedata,
//                 }
//                 return res.json(outputJson);
//             }
//         })
//     })
// }


exports.create = function (req, res) {
    var data = req.body;
    
    postSchema(data).save(function (saveErr, saveData) {
        console.log(saveErr)
        if (saveErr) {
            status: 404,
                res.send('error');
        } else {
            console.log("saveData", saveData)
            res.send({
                status: 200,
                'message': 'success',
                'data': saveData
            });
        }
    });
}

exports.updatePost = function (req, res) {
    var errorMessage = "";
    var outputJSON = "";
    var postModelObj = req.body;
    let _this = this;
 
    postSchema.update({
        _id: req.body.fieldId
    }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                genre: req.body.genre,
                type: req.body.type,
                privacy: req.body.privacy,
                music_audio: req.body.multipleAudio,
                icon: req.body.icon
            }
        },
        function (err, resp) {
            if (resp) {

                postSchema.find({ _id: req.body.fieldId }, function (err, resp) {
                   
                    if (err) {
                        outputJson = {
                            status: 400,
                            msg: "something went wrong"
                        }
                        res.status(outputJSON.status).send(outputJSON);
            
                    } else {
                        outputJSON = {
                            status: 200,
                            message: "Post updated Successfully.",
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
exports.deletePost = function (req, res) {

    var outputJSON = "";
    postSchema.update({
        _id: req.params.id
    }, {
            $set: {
                is_deleted: true,
               
            }
        },
        function (err, resp) {
            if (resp) {
               
                outputJSON = {
                    status: 200,
                    message: "Post deleted Successfully.",
                  
                };
                res.status(outputJSON.status).send(outputJSON);
            } else {
                outputJSON = {
                    status: 404,
                    message: err
                };
                res.status(outputJSON.status).send(outputJSON);
            }
        });

}


exports.genreList = function (req, res) {
    let _this = this;
    let outputJSON = "";
    let pageNo = req.params.pageNo || 1;
    let count = 12;
    let skipNo = (pageNo - 1) * count;
    GenreSchema.find({
        is_deleted: false,
        is_active: true
    },
        {
            is_deleted: 0,
            is_active: 0,
            created_date: 0,
            modified_date: 0
        }).count().exec(function (cErr, cData) {
            if (cErr) {
                outputJSON = {
                    status: 400,
                    message: "something went wrong"
                }
                res.status(200).send(outputJSON);
            } else if (cData < 0) {
                outputJSON = {
                    status: 400,
                    message: "No data found",
                }
                res.status(200).send(outputJSON);
            } else {
                GenreSchema.find({
                    is_deleted: false,
                    is_active: true
                },

                    {
                        is_deleted: 0,
                        is_active: 0,
                        created_date: 0,
                        modified_date: 0
                    }).sort({
                        created_date: -1,
                    }).skip(skipNo).limit(count).exec(function (err, data) {
                        if (err) {
                            outputJSON = {
                                'status': 400,
                                'message': "error"
                            };
                            res.status(400).send(outputJSON);
                        }
                        else {
                            outputJSON = {
                                'status': 200,
                                'message': data,
                                'count': cData
                            };
                            res.status(200).send(outputJSON);
                        }
                    })
            }
        })
}


exports.getgenrelist = function (req, res) {
    let outputJson = "";
    GenreSchema.find({ is_deleted: false, is_active: true }, { is_deleted: 0, is_active: 0, created_date: 0, modified_date: 0 }, function (err, resp) {
        if (err) {
            outputJson = {
                status: 400,
                msg: "something went wrong"
            }
            res.json(outputJson);

        } else {
            outputJson = {
                status: 200,
                data: resp
            }
            res.json(outputJson);

        }
    })
}


exports.getpostsList = function (req, res) {
    let outputJson = "";
 
    postSchema.find({ user_id:req.params.id, is_deleted: false } , function (err, resp) {
        if (err) {
            outputJson = {
                status: 400,
                msg: "something went wrong"
            }
            res.json(outputJson);

        } else {
            var response = JSON.stringify(resp);
            outputJson = {
                status: 200,
                data: response
            }
            res.json(outputJson);

        }
    })
}

exports.getPostData = function (req, res) {

    console.log("sonia")
    let outputJson = "";
 
    postSchema.findOne({ _id:req.params.id, is_deleted: false } , function (err, resp) {
        if (err) {
            outputJson = {
                status: 400,
                msg: "something went wrong"
            }
            res.json(outputJson);

        } else {
            var response = JSON.stringify(resp);
            outputJson = {
                status: 200,
                data: response
            }
            res.json(outputJson);

        }
    })
}

exports.subscriptions = function (req, res) {
    let outputJson = "";
    SubscriptionSchema.find({ is_deleted: false, is_active: true }, function (err, resp) {
        console.log("err==>",err)
        console.log("resp==>",resp)
        if (err) {
            outputJson = {
                status: 400,
                msg: "something went wrong"
            }
            res.json(outputJson);

        } else {
            outputJson = {
                status: 200,
                data: resp
            }
            res.json(outputJson);

        }
    })
}


exports.gettypeslist = function (req, res) {
    let outputJson = "";
    TypesSchema.find({ is_deleted: false, is_active: true }, { is_deleted: 0, is_active: 0, created_date: 0, modified_date: 0 }, function (err, resp) {
        if (err) {
            outputJson = {
                status: 400,
                msg: "something went wrong"
            }
            res.json(outputJson);

        } else {
            outputJson = {
                status: 200,
                data: resp
            }
            res.json(outputJson);

        }
    })
}

exports.edit_post = function (req,res){
    let outputJson = "";
    let reqData = req.body
    
    if(reqData._id){
        reqData.video = reqData.video?reqData.video:undefined
        postSchema.findOneAndUpdate({_id:reqData._id},reqData,{new:true},function(err,result){
            if(err){
                    outputJson = {
                        status: 400,
                        msg: "something went wrong"
                    }
                    res.json(outputJson);
            }else{
                console.log(result,'resullttttt')
                outputJson = {
                    status: 200,
                    data: result
                }
                res.json(outputJson);
            }
        })
    }else{
        outputJson = {
            status: 400,
            msg: "Required field missing"
        }
        res.json(outputJson);
    }
}

