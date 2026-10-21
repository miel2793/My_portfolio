import { Router } from 'express';
import {
  uploadProfileImage,
  uploadProjectImage,
  uploadBlogImage,
  uploadCVFile,
  deleteCVFile,
} from '../controllers/uploadController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import {
  uploadProfile,
  uploadProject,
  uploadBlog,
  uploadCV,
} from '../middleware/uploadMiddleware.js';

const router = Router();

router.post('/profile', protectAdmin, uploadProfile.single('image'), uploadProfileImage);
router.post('/project', protectAdmin, uploadProject.single('image'), uploadProjectImage);
router.post('/blog', protectAdmin, uploadBlog.single('image'), uploadBlogImage);
router.post('/cv', protectAdmin, uploadCV.single('cv'), uploadCVFile);
router.delete('/cv', protectAdmin, deleteCVFile);

export default router;
