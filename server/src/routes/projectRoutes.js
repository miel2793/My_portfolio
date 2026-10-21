import { Router } from 'express';
import {
  getPublicProjects,
  getPublicProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getPublicProjects);
router.get('/admin', protectAdmin, getAllProjectsAdmin);
router.get('/:slug', getPublicProjectBySlug);
router.post('/', protectAdmin, createProject);
router.patch('/:id', protectAdmin, updateProject);
router.delete('/:id', protectAdmin, deleteProject);

export default router;
