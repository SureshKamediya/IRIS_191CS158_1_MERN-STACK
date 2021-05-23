'use strict';
const adminModel = require('../models/admins');
const memberModel = require('../models/members');
const clubModel = require('../models/clubs');

module.exports = {

    checkIfMemberExists: function(email){

        return memberModel.find({email: email}).then(
          (member) => member.length,
          (err) => err,
        ).catch((err) => {
          console.error(err);
        });
      },
}