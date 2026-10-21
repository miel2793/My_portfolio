import { verifyToken } from '../utils/token.js';
import { dataStore } from '../utils/dataStore.js';

export const protectAdmin = async (req, res, next) => {
  try {
    let token = req.cookies?.admin_token;

    // Also check Authorization header as fallback
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in to access this resource.',
      });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Session expired or invalid token. Please log in again.',
      });
    }

    const admin = await dataStore.findById('admin', decoded.id);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found.',
      });
    }

    req.admin = {
      id: admin._id || admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };

    next();
  } catch (error) {
    console.error('[AuthMiddleware] Error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access.',
    });
  }
};
