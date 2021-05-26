'use strict';
const express = require('express');
const router = express.Router();
const requestController = require('../api/controllers/requests');


router.post('/addRequest',requestController.createRequest);
router.get('/allRequests',requestController.getAllRequests);
router.patch('/:requestId', requestController.updateRequestStatus);
router.get('/approvedItems/:userId',requestController.getMyApprovedItemsId);
router.get('/requestedItems/:userId',requestController.getMyRequestedItems);


module.exports = router;