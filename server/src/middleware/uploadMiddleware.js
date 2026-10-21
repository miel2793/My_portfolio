import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bundled uploads directory (relative to server root)
export const BUNDLED_UPLOADS_DIR = path.resolve(__dirname, '../../uploads');

// In serverless environments (Vercel, AWS Lambda), /var/task is strictly read-only.
// We detect serverless runtimes and point writable uploads to os.tmpdir() (/tmp/uploads).
const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT
);

export const TMP_UPLOADS_DIR = path.join(os.tmpdir(), 'uploads');

// Preferred base uploads directory
export const UPLOADS_DIR = isServerless
  ? TMP_UPLOADS_DIR
  : (process.env.UPLOADS_DIR || BUNDLED_UPLOADS_DIR);

const SUB_DIRS = ['profile', 'project', 'blog', 'cv'];

// Ensure upload subdirectories exist safely without crashing the Node.js process
export const ensureUploadDirs = () => {
  const targets = [UPLOADS_DIR, TMP_UPLOADS_DIR];

  targets.forEach((baseDir) => {
    SUB_DIRS.forEach((sub) => {
      try {
        const dir = path.join(baseDir, sub);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      } catch (err) {
        // Expected in read-only filesystems like Vercel /var/task.
        // Fallback to /tmp is guaranteed by TMP_UPLOADS_DIR.
      }
    });
  });
};

// Safe startup initialization
ensureUploadDirs();

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
      let dest = path.join(UPLOADS_DIR, subfolder);
      try {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        cb(null, dest);
      } catch (err) {
        // If writing to primary UPLOADS_DIR failed (e.g. read-only filesystem), fallback to /tmp
        dest = path.join(TMP_UPLOADS_DIR, subfolder);
        try {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }
          cb(null, dest);
        } catch (fallbackErr) {
          cb(fallbackErr);
        }
      }
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
