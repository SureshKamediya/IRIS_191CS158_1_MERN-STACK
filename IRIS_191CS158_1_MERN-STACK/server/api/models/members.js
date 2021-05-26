'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Define a schema

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  rollNumber: {
    type: String,
    trim: true,
    required: true,
  },
  contactNumber: {
    type: String,
    trim: true,
    required: true,
  },
  club:{
    type: String,
    trim: true,
    default: '',
  },
  convener: {
    type: Boolean,
    default: false,
  }
});

// hash user password before saving into database
MemberSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model('Member', MemberSchema);