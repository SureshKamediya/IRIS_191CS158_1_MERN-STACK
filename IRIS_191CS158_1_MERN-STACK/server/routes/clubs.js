'use strict';
const express = require('express');
const router = express.Router();
const clubController = require('../api/controllers/clubs');
const { route } = require('./members');


router.get('/allClubs',clubController.getAllClubs);
router.post('/addClub',clubController.createClub);
router.post('/clubDetails',clubController.getClubDetails);
router.patch('/:clubName', clubController.updateClubMembersDetails);
router.patch('/convener/:clubName',clubController.updateClubConvener);
router.post('/member/:memberId', clubController.getClubMemberbyId);
router.patch('/updateConvener', clubController.updateConvener);


module.exports = router;