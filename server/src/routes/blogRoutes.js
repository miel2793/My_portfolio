import { Router } from 'express';
import {
  getPublicPosts,
  getPublicPostBySlug,
  getAllPostsAdmin,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/blogController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getPublicPosts);
router.get('/admin', protectAdmin, getAllPostsAdmin);
router.get('/:slug', getPublicPostBySlug);
router.post('/', protectAdmin, createPost);
router.patch('/:id', protectAdmin, updatePost);
router.delete('/:id', protectAdmin, deletePost);

export default router;
