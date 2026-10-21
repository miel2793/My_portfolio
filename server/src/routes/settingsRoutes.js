import { Router } from 'express';
import {
  getPublicSettings,
  getAllSettingsAdmin,
  updateSettings,
  getDashboardStats,
} from '../controllers/settingsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/public', getPublicSettings);
router.get('/admin', protectAdmin, getAllSettingsAdmin);
router.get('/stats', protectAdmin, getDashboardStats);
router.patch('/', protectAdmin, updateSettings);

export default router;
