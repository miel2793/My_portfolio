import { Router } from 'express';
import {
  getPublicExperience,
  getAllExperienceAdmin,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getPublicExperience);
router.get('/admin', protectAdmin, getAllExperienceAdmin);
router.post('/', protectAdmin, createExperience);
router.patch('/:id', protectAdmin, updateExperience);
router.delete('/:id', protectAdmin, deleteExperience);

export default router;
