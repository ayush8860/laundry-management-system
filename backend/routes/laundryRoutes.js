const express = require('express');
const router = express.Router();
const { submitLaundryRequest, getAllRequests, updateRequestStatus, getMyRequests, deleteMyRequest, } = require('../controllers/laundryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// User submits a laundry request
router.post('/submit', protect, submitLaundryRequest);
// Logged-in user fetches their own requests
router.get('/my-requests', protect, getMyRequests);


// Admin gets all requests
router.get('/requests', protect, adminOnly, getAllRequests);

// Admin updates request status
router.patch('/requests/:id', protect, adminOnly, updateRequestStatus);

module.exports = router;
