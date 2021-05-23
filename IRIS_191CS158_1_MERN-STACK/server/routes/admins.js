'use strict';
const express = require('express');
const router = express.Router();
const adminController = require('../api/controllers/admins');

router.post('/login', adminController.login);
router.get('/logout', adminController.logout);



module.exports = router;