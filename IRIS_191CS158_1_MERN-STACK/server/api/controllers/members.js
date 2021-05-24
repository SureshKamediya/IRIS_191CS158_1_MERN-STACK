'use script'
const memberModel = require('../models/members');
const itemModel = require('../models/items');
const bcrypt = require('bcrypt');
const { checkIfMemberExists } = require('../helpers/utils');
const jwt = require('jsonwebtoken');

module.exports = {

    create: function(req, res, next){
        checkIfMemberExists(req.body.email)
        .then(
            (val) => {
              if (!val){
                console.log(val);
                console.log("The above val is printed");
                memberModel.create({
                  userName: req.body.userName,
                  email: req.body.email,
                  password: req.body.password,
                  rollNumber: req.body.rollNumber,
                  contactNumber: req.body.contactNumber,
                  club: '',
                  convener: false,
                }, function(err, result) {
                  if (err)
                    next(err);
                  else {
                    res.json({code: 1, status: 'success',
                      message: 'Member added successfully!!!', data: result});
                    console.log("Json sended");
                  }
                });
              }
              else{
                res.json({code: 0, status: 'Failure',
                  message: 'There is already an account with this email.',
                  data: null});
              }
            },
            (err) => { console.error(err); },
          );
    },

    login: function(req, res, next) {
        memberModel.findOne({email: req.body.email}, function(err, memberInfo) {
          if (err) {
            next(err);
          }
          else {
            console.log(memberInfo);
            if (memberInfo) {
              if (bcrypt.compareSync(req.body.password, memberInfo.password)) {
                const token = jwt.sign({id: memberInfo._id},
                  req.app.get('secretKey'), { expiresIn: '1h' });
                res.cookie('token', token, {
                  maxAge: 1000 * 60 * 60, // 1 hour
                });
                res.json({
                  code: 1,
                  status: 'success',
                  message: 'Member found!!!',
                  data: {member: memberInfo, token: token}
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

      getAllMembers: function(req, res, next) {
        let memberList = [];
        memberModel.find({}, function(err, members) {
          if (err)
            next(err);
          else {
            console.log(members);
            for (let member of members) {
              memberList.push({
                _id: member._id,
                userName: member.userName,
                email: member.email,
                rollNumber: member.rollNumber,
                contactNumber: member.contactNumber,
                club: member.club,
                convener: member.convener,
              });
            }
            if (memberList.length)
              res.json({
                code: 1,
                status: 'success',
                message: 'Member List fetched..',
                data: memberList,
              });
            else
              res.json({
                code: 0,
                status: 'success',
                message: 'There are currently no currently members.',
                data: null,
              });
          }
        });
      },

      
      getClubMembers: function(req, res, next) {
        let memberList = [];
        memberModel.find({club:req.params.clubName}, function(err, members) {
          if (err)
            next(err);
          else {
            for (let member of members) {
              memberList.push({
                _id: member._id,
                userName: member.userName,
                email: member.email,
                rollNumber: member.rollNumber,
                contactNumber: member.contactNumber,
                club: member.club,
                convener: member.convener,
              });
            }
            if (memberList.length)
              res.json({
                code: 1,
                status: 'success',
                message: 'Member List fetched..',
                data: memberList,
              });
            else
              res.json({
                code: 0,
                status: 'success',
                message: 'There are currently no members in this club',
                data: null,
              });
          }
        });
      },

      getAllItems: function(req, res, next) {
        let itemList = [];
        itemModel.find({club:req.body.club}, function(err, items) {
          if (err)
            next(err);
          else {
            for (let item of items) {
              itemList.push({
                itemName: item.itemName,
                quantity: item.quantity,
                club: item.club,
                image: item.image,
              });
            }
            if (itemList.length)
              res.json({
                code: 1,
                status: 'success',
                message: 'Item List fetched..',
                data: itemList,
              });
            else
              res.json({
                code: 0,
                status: 'success',
                message: 'There are currently no currently items.',
                data: null,
              });
          }
        });
      },

      updateMemberClub: function(req,res,next) {
        console.log("I am here");
        console.log(req.params.memberId);
        memberModel.updateOne({_id:req.params.memberId},{club:req.body.club}, function(err){
            if(err){
              console.log(err);
            }
            else{
              console.log(req.params.memberId);
              res.json({
                code: 1,
                status: 'success',
                message: "We have updated the club of the Member ",
                data: null,
              });
            }
        });
      },

      updateMemberRole: function(req,res,next) {
        console.log("I am here");
        console.log(req.params.memberId);
        memberModel.updateOne({_id:req.params.memberId},{convener:req.body.convener}, function(err){
            if(err){
              console.log(err);
            }
            else{
              console.log(req.params.memberId);
              res.json({
                code: 1,
                status: 'success',
                message: "We have updated the role of the Member ",
                data: null,
              });
            }
        });
      },


      getById: function(req, res, next) {
        console.log(req.body);
        memberModel.findById(req.body.memberId, function(err, memberInfo) {
          if (err)
            next(err);
          else {
            console.log(memberInfo);
            res.json({
              code: 1,
              status: 'success',
              message: 'Member found!!!',
              data: memberInfo,
            });
          }
        });
      },
   
}

