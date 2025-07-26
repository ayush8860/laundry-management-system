import Request from '../models/Request.js';

export async function getAllRequests(req, res) {
  const requests = await Request.find().populate('user', 'name email');
  res.json(requests);
}

export async function getMyRequests(req, res) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const requests = await Request.find({ user: userId });
  res.json(requests);
}

export async function createRequest(req, res) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const { items, address, specialInstructions, preferredDate, preferredTime } = req.body;
  const request = new Request({ user: userId, items, address, specialInstructions, preferredDate, preferredTime });
  await request.save();
  res.status(201).json(request);
}

export async function updateRequestStatus(req, res) {
  const { status } = req.body;
  const request = await Request.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(request);
} 