import { Router } from 'express';
import {
  getPublicLeadership,
  getAllLeadershipAdmin,
  createLeadership,
  updateLeadership,
  deleteLeadership,
} from '../controllers/leadershipController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getPublicLeadership);
router.get('/admin', protectAdmin, getAllLeadershipAdmin);
router.post('/', protectAdmin, createLeadership);
router.patch('/:id', protectAdmin, updateLeadership);
router.delete('/:id', protectAdmin, deleteLeadership);

export default router;
