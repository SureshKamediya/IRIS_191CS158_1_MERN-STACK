'use scripts';
const requestModel = require('../models/requests');

module.exports = {

    createRequest: function(req, res, next){
        requestModel.create({
          user: req.body.user,
          item: req.body.item,
          club: req.body.club,
          permission: req.body.permission,
          feedback: req.body.feedback,
        }, function(err, result) {
          if (err)
            next(err);
          else {
            res.json({code: 1, status: 'success',
              message: 'Request added successfully!!!', data: result});
            console.log("Json sended");
          }
        });
      },

      getAllRequests: function(req, res, next) {
        let requestList = [];
        requestModel.find({}, function(err, requests) {
          if (err)
            next(err);
          else {
            console.log(requests);
            for (let request of requests) {
              requestList.push({
                _id: request._id,
                user: request.user,
                item: request.item,
                club: request.club,
                permission: request.permission,
                feedback: request.feedback,
              });
            }
            if (requestList.length)
              res.json({
                code: 1,
                status: 'success',
                message: 'Requests List fetched..',
                data: requestList,
              });
            else
              res.json({
                code: 0,
                status: 'success',
                message: 'There are no requests currently',
                data: null,
              });
          }
        });
      },

      updateRequestStatus: function(req,res,next) {
        console.log("I am here");
        console.log(req.params.requestId);
        requestModel.updateOne({_id:req.params.requestId},{permission:req.body.permission, feedback: req.body.feedback}, function(err){
            if(err){
              console.log(err);
            }
            else{
              console.log(req.params.memberId);
              res.json({
                code: 1,
                status: 'success',
                message: "We have updated the status of the request ",
                data: null,
              });
            }
        });
      },

      getMyApprovedItemsId: function(req, res, next) {
        let itemList = [];
        console.log(req.params.userId);
        requestModel.find({user:req.params.userId}, function(err, requests) {
          if (err)
            next(err);
          else {
            console.log(requests);
            for (let request of requests) {
              if(request.permission === "Approve")
              itemList.push({
               _id: request.item,
              });
            }
            if (itemList.length)
              res.json({
                code: 1,
                status: 'success',
                message: 'Approved items list List fetched..',
                data: itemList,
              });
            else
              res.json({
                code: 0,
                status: 'success',
                message: 'There are currently no approved items in my list',
                data: null,
              });
          }
        });
      },

      getMyRequestedItems: function(req, res, next) {
        let requestedList = [];
        console.log(req.params.userId);
        requestModel.find({user:req.params.userId}, function(err, requests) {
          if (err)
            next(err);
          else {
            console.log(requests);
            for (let request of requests) {
              requestedList.push({
               _id: request.item,
               feedback: request.feedback,
               permission: request.permission,
              });
            }
            if (requestedList.length)
              res.json({
                code: 1,
                status: 'success',
                message: 'All requested items list List fetched..',
                data: requestedList,
              });
            else
              res.json({
                code: 0,
                status: 'success',
                message: 'There are currently no requested items in my list',
                data: null,
              });
            }
        });
      },

}
