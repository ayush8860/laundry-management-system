const mongoose = require('mongoose');

const laundryRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceType: { type: String, required: true }, // e.g., "wash", "dry", "iron"
    clothesCount: { type: Number, required: true },
    pickupDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LaundryRequest', laundryRequestSchema);
