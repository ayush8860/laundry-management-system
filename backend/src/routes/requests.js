import express from 'express';
import auth from '../middleware/auth.js';
import requireAdmin from '../middleware/role.js';
import { getAllRequests, getMyRequests, createRequest, updateRequestStatus } from '../controllers/requestController.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// User routes
router.get('/my', getMyRequests);
router.post('/', createRequest);

// Admin routes
router.get('/', requireAdmin, getAllRequests);
router.patch('/:id', requireAdmin, updateRequestStatus);

export default router; 