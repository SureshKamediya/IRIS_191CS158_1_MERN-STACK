'use strict';
const mongoose = require('mongoose');
// Define a schema

const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  clubName: {
    type: String,
    trim: true,
    required: true,
  },
  convener: {
      type: Schema.Types.ObjectId,
      ref: 'members',
      default: null,
  },

  clubMembersList: {
    type: [Schema.Types.ObjectId],
    ref: 'members',
    default: [],
  }
});


module.exports = mongoose.model('Club', ClubSchema);