import { Router } from 'express';
import {
  getPublicSkills,
  getAllSkillsAdmin,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getPublicSkills);
router.get('/admin', protectAdmin, getAllSkillsAdmin);
router.post('/', protectAdmin, createSkill);
router.patch('/:id', protectAdmin, updateSkill);
router.delete('/:id', protectAdmin, deleteSkill);

export default router;
