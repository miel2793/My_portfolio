import { Router } from 'express';
import { login, logout, getMe, updatePassword } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', protectAdmin, getMe);
router.patch('/update-password', protectAdmin, updatePassword);

export default router;
