'use strict';
const mongoose = require('mongoose');
// Define a schema

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'members',
    required: true,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'items',
    required: true,
  },
  club: {
      type: String,
      trim: true,
      required: true,
  },
  permission: {
      type: String,
      trim: true,
      default: 'Awaiting Approval',
  },
  feedback: {
    type: String,
    trim: true,
    default: '',
  }
});

module.exports = mongoose.model('Request', RequestSchema);