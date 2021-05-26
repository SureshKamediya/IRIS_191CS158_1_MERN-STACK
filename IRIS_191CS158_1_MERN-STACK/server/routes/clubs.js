'use strict';
const express = require('express');
const router = express.Router();
const clubController = require('../api/controllers/clubs');


router.get('/allClubs',clubController.getAllClubs);
router.post('/addClub',clubController.createClub);
router.post('/clubDetails',clubController.getClubDetails);
router.patch('/convener/:clubName',clubController.updateClubConvener);
router.post('/member/:memberId', clubController.getClubMemberbyId);


module.exports = router;