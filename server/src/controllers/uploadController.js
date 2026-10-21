import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dataStore } from '../utils/dataStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.resolve(__dirname, '../../uploads');

export const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded.',
      });
    }

    const fileUrl = `/uploads/profile/${req.file.filename}`;

    // Auto update profileImage in settings
    let settings = await dataStore.findOne('settings');
    if (settings) {
      const updatedProfile = { ...(settings.profile || {}), profileImage: fileUrl };
      await dataStore.findByIdAndUpdate('settings', settings._id || settings.id, {
        profile: updatedProfile,
      });
    }

    res.json({
      success: true,
      message: 'Profile image uploaded successfully.',
      url: fileUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProjectImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No project image uploaded.',
      });
    }

    const fileUrl = `/uploads/project/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Project image uploaded successfully.',
      url: fileUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadBlogImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No blog image uploaded.',
      });
    }

    const fileUrl = `/uploads/blog/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Blog image uploaded successfully.',
      url: fileUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadCVFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No CV PDF file uploaded.',
      });
    }

    let settings = await dataStore.findOne('settings');
    if (!settings) {
      settings = await dataStore.create('settings', {});
    }

    // Safely remove previous CV file if it exists
    if (settings.cvFile && settings.cvFile.filename) {
      const oldPath = path.join(UPLOADS_DIR, 'cv', settings.cvFile.filename);
      if (fs.existsSync(oldPath)) {
        try {
          fs.unlinkSync(oldPath);
        } catch (e) {
          console.warn('[UploadCV] Failed to remove old CV file:', e.message);
        }
      }
    }

    const fileUrl = `/uploads/cv/${req.file.filename}`;
    const cvFileData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: fileUrl,
      sizeBytes: req.file.size,
      uploadedAt: new Date().toISOString(),
      isPublic: settings.cvFile?.isPublic || false, // Keep existing privacy setting
    };

    const updated = await dataStore.findByIdAndUpdate('settings', settings._id || settings.id, {
      cvFile: cvFileData,
    });

    res.json({
      success: true,
      message: 'CV uploaded successfully.',
      cvFile: cvFileData,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCVFile = async (req, res, next) => {
  try {
    let settings = await dataStore.findOne('settings');
    if (!settings || !settings.cvFile || !settings.cvFile.filename) {
      return res.status(404).json({
        success: false,
        message: 'No CV file found to delete.',
      });
    }

    const filePath = path.join(UPLOADS_DIR, 'cv', settings.cvFile.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.warn('[DeleteCV] Failed to unlink file:', e.message);
      }
    }

    const resetCvData = {
      filename: '',
      originalName: '',
      url: '',
      sizeBytes: 0,
      uploadedAt: null,
      isPublic: false,
    };

    await dataStore.findByIdAndUpdate('settings', settings._id || settings.id, {
      cvFile: resetCvData,
    });

    res.json({
      success: true,
      message: 'CV removed successfully.',
    });
  } catch (error) {
    next(error);
  }
};
