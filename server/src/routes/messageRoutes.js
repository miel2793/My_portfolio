import { Router } from 'express';
import {
  submitMessage,
  getMessagesAdmin,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/messageController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', contactLimiter, submitMessage);
router.get('/', protectAdmin, getMessagesAdmin);
router.patch('/:id', protectAdmin, updateMessageStatus);
router.delete('/:id', protectAdmin, deleteMessage);

export default router;
