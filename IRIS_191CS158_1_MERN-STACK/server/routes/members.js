'use strict';
const express = require('express');
const router = express.Router();
const memberController = require('../api/controllers/members');

router.post('/register', memberController.create);
router.post('/login', memberController.login);
router.get('/logout', memberController.logout);
router.get('/allMembers', memberController.getAllMembers);
router.get('/clubMembers/:clubName', memberController.getClubMembers);
router.get('/clubItems', memberController.getAllItems);
router.patch('/:memberId', memberController.updateMemberClub);
router.patch('/convener/:memberId',memberController.updateMemberRole);

module.exports = router;