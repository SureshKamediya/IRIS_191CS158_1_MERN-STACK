'use strict';
const express = require('express');
const router = express.Router();
const itemController = require('../api/controllers/items');


router.post('/addItem',itemController.createItem);
router.get('/allItems',itemController.getAllItems);
router.post('/:ItemId', itemController.getItemById);
router.patch('/item/:itemId', itemController.updateItemQuantity);


module.exports = router;