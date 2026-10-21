import { Router } from 'express';
import {
  getPublicEducation,
  getAllEducationAdmin,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getPublicEducation);
router.get('/admin', protectAdmin, getAllEducationAdmin);
router.post('/', protectAdmin, createEducation);
router.patch('/:id', protectAdmin, updateEducation);
router.delete('/:id', protectAdmin, deleteEducation);

export default router;
