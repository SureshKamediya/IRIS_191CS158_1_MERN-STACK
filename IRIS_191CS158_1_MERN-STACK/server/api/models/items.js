'use strict';
const mongoose = require('mongoose');
// Define a schema

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemName: {
    type: String,
    trim: true,
    required: true,
  },
  quantity: {
      type: Number,
      required: true,
  },
  club: {
      type: Schema.Types.ObjectId,
      ref: 'clubs',
      required: true,
  },
  image:{
    type: Schema.Types.ObjectId,
    ref: 'images',
  }
});

module.exports = mongoose.model('Item', ItemSchema);