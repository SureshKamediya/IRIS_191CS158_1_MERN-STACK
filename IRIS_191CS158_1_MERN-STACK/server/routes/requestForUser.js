'use strict';
const express = require('express');
const router = express.Router();
const memberController = require('../api/controllers/members');
const adminController = require('../api/controllers/admins');

router.get('/member', memberController.getById);

module.exports = router;