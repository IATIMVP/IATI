var mongoose = require('mongoose');
var User = mongoose.model('users');

exports.auth = function (req, res, next) {
  
     
    if (!req.headers['token'] || req.headers['token'] === 'undefined') {
        console.log("sonia");
        return res.json({ status: 401, msg: 'Session Expired, Please login again' })
    }
    var token = req.headers['token'];
    var user = new User();
    user.verifyToken(token, function (valid) {

        if (!valid) {
            return res.json({ status: 401, msg: 'Session Expired, Please login again' });
        }
        else {
            User.findOne({ '_id': valid._id, 'is_deleted': false}, function (err, getUser) {
                if (getUser) {
                    if(getUser.role=='superadmin' && !req.body.selected_user_id){
                        req.body.super_params = getUser;
                        next();
                    }else if(getUser.role=='user'){
                        req.body.user_params = getUser;
                        next();
                    }    
                    if(req.body.selected_user_id && user.role=='superadmin'){
                        userCtrl.getUserDetails({ '_id': req.body.selected_user_id}, function (selecteduser) {
                            if(selecteduser){
                                req.body.user_params=selecteduser;                            
                            }
                            next();
                        })
                    }   
                    // req.body.user_params = valid;
                    // next();
                }else{
                    return res.json({ status: 403, msg: 'Session Expired, Please login again' });
                }
            });
        }
    })
}


// exports.isAdminAuth = function (req, res, next) {
//     if (!req.headers['token'] || req.headers['token'] === 'undefined') {
//         return res.json({ status: 401, msg: 'Session Expired, Please login again' })
//     }
//     var token = req.headers['token'];
//     var user = new User();
//     user.verifyToken(token, function (valid) {
//         if (!valid || valid.scu != 777) {
//             return res.json({ status: 401, msg: 'Unauthorized access,please login again as admin' });
//         }
//         else {
//             req.body.user_params = valid;
//             next();
//         }
//     })
// }



// module.exports.isAuth = function (req, res, next) {
    
//         if (!req.headers['token'] || req.headers['token'] === 'undefined')
//             return res.json({status: 401, msg: 'invalid request'})
    
//         let token = req.headers['token'];
//         let user = new User();
    
       
//         user.verifyToken(token, function (valid) {
//             if (!valid) {
                
//                 return res.json({status: 401, msg: 'Invalid tokens please login again'})
//             }
//             else {            
//                 userCtrl.getUserDetails(valid._id, function (user) {                
//                     if(user.role=='superadmin' && !req.body.selected_user_id){
//                         req.body.super_params = user;
//                         next();
//                     }else if(user.role=='user'){
//                         req.body.user_params = user;
//                         next();
//                     }                 
//                     if(req.body.selected_user_id && user.role=='super'){
//                         userCtrl.getUserDetails(req.body.selected_user_id, function (selecteduser) {
//                             if(selecteduser){
//                                 req.body.user_params=selecteduser;                            
//                             }
//                             next();
//                         })
//                     }               
//                 })
//             }
//         })  
//     }
