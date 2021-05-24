'use scripts';
const adminModel = require('../models/admins');
const memberModel = require('../models/members');
const clubModel = require('../models/clubs');
const bcrypt = require('bcrypt');



module.exports = {

    getAllClubs: function(req, res, next) {
        let clubList = [];
        clubModel.find({}, function(err, clubs) {
          if (err)
            next(err);
          else {
            console.log(clubs);
            for (let club of clubs) {
              clubList.push({
                _id: club._id,
                clubName: club.clubName,
                convener: club.convener
              });
            }
            if (clubList.length)
              res.json({
                code: 1,
                status: 'success',
                message: 'Club List fetched..',
                data: clubList,
              });
            else
              res.json({
                code: 0,
                status: 'success',
                message: 'There are no clubs currently',
                data: null,
              });
          }
        });
      },

      createClub: function(req, res, next){
        clubModel.create({
          clubName: req.body.clubName, 
        }, function(err, result) {
          if (err)
            next(err);
          else {
            res.json({code: 1, status: 'success',
              message: 'Club added successfully!!!', data: result});
            console.log("Json sended");
          }
        });
      },



      getClubDetails: function(req, res, next) {
        console.log(req.body);
        console.log(req.body.clubName);
        clubModel.findOne({clubName:req.body.clubName}, function(err, club) {
          if (err)
            next(err);
          else {
            console.log(club);
            if (club)
              res.json({
                code: 1,
                status: 'success',
                message: 'Club is fetched ...',
                data: club,
              });
            else
              res.json({
                code: 0,
                status: 'success',
                message: 'There is no club with this name',
                data: null,
              });
          }
        });
      },

      // updateClubMembersDetails: function(req,res,next) {
      //   console.log("I am here");
      //   console.log(req.params.clubName);
      //   clubModel.updateOne({clubName:req.body.clubName},{clubMembersList:req.body.clubMembersList}, function(err){
      //       if(err){
      //         console.log(err);
      //       }
      //       else{
      //         console.log(req.params.clubId);
      //         res.json({
      //           code: 1,
      //           status: 'success',
      //           message: "We have updated the club Members List ",
      //           data: null,
      //         });
      //       }
      //   });
      // },

      updateClubConvener: function(req,res,next) {
        console.log("I am here");
        console.log(req.params.clubName);
        clubModel.updateOne({clubName:req.body.clubName},{convener:req.body.convener}, function(err){
            if(err){
              console.log(err);
            }
            else{
              console.log(req.params.clubId);
              res.json({
                code: 1,
                status: 'success',
                message: "We have updated the club convener ",
                data: null,
              });
            }
        });
      },


      getClubMemberbyId: function(req,res,next){
        memberModel.findById(req.body.objectId, function(err, member){
          if(err){
            next(err);
          }
          else{
            console.log(member);
            if(member){
              res.json({
                code: 1,
                status: 'success',
                message: 'We got the member',
                data: member,
              });
            }
            else{
              res.json({
                code: 0,
                status: 'success',
                message: 'There is no member by this id',
                data: null,
              });
            }
          }
        })
      },

}