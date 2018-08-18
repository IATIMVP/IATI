var mailer = require('nodemailer');
var nodemailer = require('nodemailer');
var constantObj = require('../constants.js');
var fs = require('fs');
exports.send = function (user, subjectVal, view, from) {
    console.log("sadasdasdasdasdas", user)
    // var mailBody = view;
    console.log("dsfsdfsd", view)
    var mailBody = fs.readFileSync('./emailtemplate/' + view).toString();
    console.log("sadSAdaa", mailBody);
    // mailBody = view;
    mailBody = mailBody.replace("{{email}}", user.email);
    mailBody = mailBody.replace("{{name}}", user.firstname);
    mailBody = mailBody.replace("{{password}}", user.pass);
    mailBody = mailBody.replace("{{title}}", user.title);
    mailBody = mailBody.replace("{{app_link}}", user.app_link);
    mailBody = mailBody.replace("{{response}}", user.response);
    mailBody = mailBody.replace("{{status}}", user.status);
    mailBody = mailBody.replace("{{phone}}", user.phone);
    mailBody = mailBody.replace("{{message}}", user.message);

    var myDate = new Date();
    var year = myDate.getFullYear();
    mailBody = mailBody.replace("{{year}}", year);
    var transporter = nodemailer.createTransport({
        host: constantObj.gmailSMTPCredentials.host,
        auth: {
            user: constantObj.gmailSMTPCredentials.username,
            pass: constantObj.gmailSMTPCredentials.password
        },
        port: 465,
        secure: true
    });
    // create reusable transporter object using SM,TP transport 
    // NB! No need to recreate the transporter object. You can use 
    // the same transporter object for all e-mails 
    // setup e-mail data with unicode symbols 
    // if (!from) {
    //     var from = 'Ramanpreet ✔ <raman411@gmail.com>';
    // }
    var mailOptions = {
        from: "amitbjp033@gmail.com", // sender address 
        to: user.email, // list of receivers 
        subject: subjectVal, // Subject line 

        //text: mailBody, // plaintext body 
        html: mailBody // html body 
    };
    // send mail with defined transport object 
    //transporter.sendMail(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
        console.log("info", info)
        if (error) {
            return console.log(error);
        }
    });
};