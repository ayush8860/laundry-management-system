const LaundryRequest = require('../models/LaundryRequest');

exports.submitLaundryRequest = async (req, res) => {
  try {
    const request = new LaundryRequest({ ...req.body, user: req.user._id });
    await request.save();
    res.status(201).json({ message: 'Laundry request submitted', request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await LaundryRequest.find().populate('user', 'name email');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await LaundryRequest.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: 'Status updated', request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getMyRequests = async (req, res) => {
    try {
      const requests = await LaundryRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
      res.json(requests);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  // Delete user's own request
exports.deleteMyRequest = async (req, res) => {
    try {
      const request = await LaundryRequest.findOne({
        _id: req.params.id,
        user: req.user._id,
      });
  
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
  
      await request.deleteOne();
      res.json({ message: 'Laundry request deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  