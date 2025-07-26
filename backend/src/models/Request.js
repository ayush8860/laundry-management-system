import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: String, required: true }],
  address: { type: String },
  specialInstructions: { type: String },
  preferredDate: { type: String },
  preferredTime: { type: String },
  status: { type: String, enum: ['pending', 'picked_up', 'in_process', 'delivered'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Request', requestSchema); 