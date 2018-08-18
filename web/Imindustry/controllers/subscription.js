const express = require('express');
const chargeSchema = require('./../models/charge');
const GenreSchema = require('./../models/genre');
const config = require('./../config/config.json');
const moment = require('moment');
var passport = require('passport');
var fs = require('fs');
var path = require('path');


exports.ChargeSubscribers= function (req, res) {
  
    let outputJson = "";
    chargeSchema.find({ is_deleted: false, is_active: true }, function (err, resp) {

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

