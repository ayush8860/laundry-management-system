const express = require('express');
const router = express.Router();

const {
  createLaundryRequest,
  getUserLaundryRequests,
  getAllLaundryRequests,
  updateLaundryStatus
} = require('../controllers/laundryController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// POST a new laundry request (User)
router.post('/', protect, createLaundryRequest);

// GET all requests of logged-in user
router.get('/my', protect, getUserLaundryRequests);

// GET all requests (Admin only)
router.get('/all', protect, adminOnly, getAllLaundryRequests);

// PUT update status of a request (Admin only)
router.put('/:id/status', protect, adminOnly, updateLaundryStatus);

module.exports = router;
