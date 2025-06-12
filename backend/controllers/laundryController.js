const LaundryRequest = require('../models/LaundryRequest');

// @desc    Create a new laundry request
// @route   POST /api/laundry
// @access  Private
exports.createLaundryRequest = async (req, res) => {
  try {
    const { serviceType, clothesCount, pickupDate } = req.body;

    const newRequest = await LaundryRequest.create({
      user: req.user._id,
      serviceType,
      clothesCount,
      pickupDate,
      status: 'pending',
    });

    res.status(201).json({ message: 'Laundry request created', data: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get logged-in user's laundry requests
// @route   GET /api/laundry/my
// @access  Private
exports.getUserLaundryRequests = async (req, res) => {
  try {
    const requests = await LaundryRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all laundry requests (admin only)
// @route   GET /api/laundry/all
// @access  Admin
exports.getAllLaundryRequests = async (req, res) => {
  try {
    const requests = await LaundryRequest.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update laundry request status
// @route   PUT /api/laundry/:id/status
// @access  Admin
exports.updateLaundryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await LaundryRequest.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    await request.save();

    res.json({ message: 'Status updated', data: request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
