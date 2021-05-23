'use script'
const adminModel = require('../models/admins');
const memberModel = require('../models/members');
const clubModel = require('../models/clubs');
const bcrypt = require('bcrypt');

module.exports = {

    login: function(req, res, next) {
        adminModel.findOne({email: req.body.email}, function(err, adminInfo) {
          if (err) {
            next(err);
          }
          else {
            if (adminInfo) {
              if (req.body.password === adminInfo.password) {
                console.log(adminInfo);
                res.json({
                  code: 1,
                  status: 'success',
                  message: 'Admin found!!!',
                  data: adminInfo,
                });
              }
              else {
                res.json({
                  code: 0,
                  status: 'error',
                  message: 'Invalid password',
                  data: null,
                });
              }
            } 
            else{
              res.json({
                code: 0,
                status: 'error',
                message: 'There is no account associated with this email.',
                data: null,
              });
            }
          }
        });
      },


      logout: function(req, res, next) {
        if (req.cookies.token){
          res.clearCookie('token');
          res.json({code: 1, status: 'success', message: 'Logged Out..',
            data: null});
        } else {
          res.json({code: 0, status: 'error', message: 'Log in first..',
            data: null});
        };
      }, 

      
      
}

