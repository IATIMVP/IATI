const express = require('express');
const trackSchema = require('./../models/track');
const config = require('./../config/config.json');
const moment = require('moment');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var async = require('async');


exports.trackCreate = function (req, res) {
    var errorMessage = "";
    var outputJSON = "";
    var trackModelObj = req.body;
    // let _this = this,
    directory = "./public/media/trackaudio/";
    fs.exists(directory, function (exists) {
        if (!exists) {
            fs.mkdir(directory, function (err) {
                if (err) {
                    res.send(500, err);
                } else {
                    saveTrack(req, res);
                }
            });
        } else {
            saveTrack(req, res);
        }
    });
}

var saveTrack = function (req, res) {
    let _this = this;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; //keep file extension
    form.uploadDir = process.env.PWD + '/public/media/trackaudio';
    form.multiples = true;
    var arrfile = [];
    var multipleAudio = [];

    form.parse(req, function (err, fields, files) {
        console.log(">>>>>>", fields);
        console.log("1111111111", files);

        var arrfile = [];
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
            console.log(myfile);
            var fileType = resp.type;
            fileType = fileType.split('/');
            var fileName = resp.name;
            var baseImageUrl = path.join(__dirname + '/../public/media/trackaudio/', fileName);
            if (fileType[0] == 'audio') {
                fields.track_audio = myfile[myfile.length - 1];
                multipleAudio.push(fields.track_audio);
            } else if (fileType[0] == 'image') {
                fields.icon = myfile[myfile.length - 1];
            } else {
                outputJson = {
                    status: 400,
                    message: "File is not valid. Please select valid file.",
                }
                return res.json(outputJson);
            }

        })
        fields.track_audio = multipleAudio;
        trackSchema(fields).save(fields, function (saveErr, savedata) {
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
    })
}


exports.updateTrack = function (req, res) {
    var errorMessage = "";
    var outputJSON = "";
    var trackModelObj = req.body;
    let _this = this,
        directory = "./public/media/trackaudio/";
    fs.exists(directory, function (exists) {
        if (!exists) {
            fs.mkdir(directory, function (err) {
                if (err) {
                    _this.res.send(500, err);
                } else {
                    updateAudio(req, res);
                }
            });
        } else {
            updateAudio(req, res);
        }
    });
};


var updateAudio = function (req, res) {
    let _this = this;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; //keep file extension
    form.uploadDir = process.env.PWD + '/public/media/trackaudio';
    form.multiples = true;
    var arrfile = [];
    var multipleAudio = [];

    form.parse(req, function (err, fields, files) {
        var arrfile = [];
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
            var fileName = resp.name;
            var baseImageUrl = path.join(__dirname + '/../public/media/trackaudio/', fileName);
            if (fileType[0] == 'audio') {
                fields.track_audio = myfile[myfile.length - 1];
                multipleAudio.push(fields.track_audio);
            } else if (fileType[0] == 'image') {
                fields.icon = myfile[myfile.length - 1];
            } else {
                outputJson = {
                    status: 400,
                    message: "File is not valid. Please select valid file.",
                }
                return res.json(outputJson);
            }

        })
        trackSchema.findOneAndUpdate({
            _id: fields.fieldId
        },
            {
                $set: {
                    title: fields.title,
                    genre: fields.genre,
                    track_audio: multipleAudio,
                    icon: fields.icon
                }
            },
            function (err, resp) {
                if (resp) {
                    let obj = {
                        title: fields.title,
                        genre: fields.genre,
                    };
                    outputJSON = {
                        status: 200,
                        message: "Tracks updated Successfully.",
                        data: obj
                    };
                    res.status(outputJSON.status).send(outputJSON);
                } else {
                    outputJSON = {
                        status: 404,
                        message: "something went wrong"
                    };
                    res.status(outputJSON.status).send(outputJSON);
                }
            });
    })
}

