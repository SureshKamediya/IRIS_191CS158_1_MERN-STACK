'use scripts';
const itemModel = require('../models/items');

module.exports = {

    createItem: function(req, res, next){
        itemModel.create({
          itemName: req.body.itemName,
          quantity: req.body.quantity,
          club: req.body.club, 
        }, function(err, result) {
          if (err)
            next(err);
          else {
            res.json({code: 1, status: 'success',
              message: 'Item added successfully!!!', data: result});
            console.log("Json sended");
          }
        });
      },

      getAllItems: function(req, res, next) {
        let itemList = [];
        itemModel.find({}, function(err, items) {
          if (err)
            next(err);
          else {
            console.log(items);
            for (let item of items) {
              itemList.push({
                _id: item._id,
                itemName: item.itemName,
                quantity: item.quantity,
                club: item.club,
              });
            }
            if (itemList.length)
              res.json({
                code: 1,
                status: 'success',
                message: 'Items List fetched..',
                data: itemList,
              });
            else
              res.json({
                code: 0,
                status: 'success',
                message: 'There are no items currently',
                data: null,
              });
          }
        });
      },

      getItemById: function(req,res,next){
        itemModel.findById(req.body.ItemId, function(err, item){
          if(err){
            next(err);
          }
          else{
            console.log(item);
            if(item){
              res.json({
                code: 1,
                status: 'success',
                message: 'We got the item',
                data: item,
              });
            }
            else{
              res.json({
                code: 0,
                status: 'success',
                message: 'There is no item by this id',
                data: null,
              });
            }
          }
        })
      },


      updateItemQuantity: function(req,res,next) {
        console.log("I am here");
        console.log(req.params.itemId);
        itemModel.updateOne({_id:req.params.itemId},{quantity: req.body.quantity}, function(err){
            if(err){
              console.log(err);
            }
            else{
              console.log(req.params.itemId);
              res.json({
                code: 1,
                status: 'success',
                message: "We have updated the quantity of the item",
                data: null,
              });
            }
        });
      },

}
