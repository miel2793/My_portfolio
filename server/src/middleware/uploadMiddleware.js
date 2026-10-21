import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.resolve(__dirname, '../../uploads');

// Ensure upload subdirectories exist
['profile', 'project', 'blog', 'cv'].forEach((sub) => {
  const dir = path.join(UPLOADS_DIR, sub);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const ALLOWED_IMAGE_MIMES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
];

const ALLOWED_IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];

const ALLOWED_CV_MIMES = ['application/pdf'];
const ALLOWED_CV_EXTS = ['.pdf'];

const createStorage = (subfolder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = path.join(UPLOADS_DIR, subfolder);
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const randomHex = crypto.randomBytes(8).toString('hex');
      const safeName = `${subfolder}-${Date.now()}-${randomHex}${ext}`;
      cb(null, safeName);
    },
  });
};

const imageFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_IMAGE_MIMES.includes(file.mimetype) && ALLOWED_IMAGE_EXTS.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid image file. Only JPEG, PNG, WebP, SVG, and GIF are allowed.'), false);
  }
};

const cvFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_CV_MIMES.includes(file.mimetype) && ALLOWED_CV_EXTS.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid document. Only PDF format is accepted for CV uploads.'), false);
  }
};

export const uploadProfile = multer({
  storage: createStorage('profile'),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

export const uploadProject = multer({
  storage: createStorage('project'),
  fileFilter: imageFileFilter,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
});

export const uploadBlog = multer({
  storage: createStorage('blog'),
  fileFilter: imageFileFilter,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
});

export const uploadCV = multer({
  storage: createStorage('cv'),
  fileFilter: cvFileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
});
