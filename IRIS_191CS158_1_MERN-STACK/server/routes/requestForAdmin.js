'use strict';
const express = require('express');
const router = express.Router();
const memberController = require('../api/controllers/members');
const adminController = require('../api/controllers/admins');


router.get('/admin',adminController.getById);

module.exports = router;