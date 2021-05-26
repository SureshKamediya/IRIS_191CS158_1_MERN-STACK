'use script'
const jwt = require('jsonwebtoken');
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
                const token = jwt.sign({id: adminInfo._id},
                  req.app.get('secretKey'), { expiresIn: '1h' });
                res.cookie('token', token, {
                  maxAge: 1000 * 60 * 60, // 1 hour
                });
                console.log(adminInfo);
                res.json({
                  code: 1,
                  status: 'success',
                  message: 'Admin found!!!',
                  data: {admin: adminInfo, token:token}
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
          console.log("cookies are cleared and hence you can logout.")
          res.json({code: 1, status: 'success', message: 'Logged Out..',
            data: null});
        } else {
          res.json({code: 0, status: 'error', message: 'Log in first..',
            data: null});
        };
      },
      
      getById: function(req, res, next) {
        adminModel.findById(req.body.adminId, function(err, adminInfo) {
          if (err)
            next(err);
          else {
            res.json({
              code: 1,
              status: 'success',
              message: 'Admin found!!!',
              data: adminInfo,
            });
          }
        });
      },

      
      
}

