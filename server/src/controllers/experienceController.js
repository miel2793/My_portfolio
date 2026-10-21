import { dataStore } from '../utils/dataStore.js';

export const getPublicExperience = async (req, res, next) => {
  try {
    const experiences = await dataStore.find('experience', { published: true }, { displayOrder: 1 });
    res.json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllExperienceAdmin = async (req, res, next) => {
  try {
    const experiences = await dataStore.find('experience', {}, { displayOrder: 1 });
    res.json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const {
      organization,
      position,
      employmentType,
      startDate,
      endDate,
      isCurrent,
      description,
      organizationUrl,
      logo,
      published,
      displayOrder,
    } = req.body;

    if (!organization || !position) {
      return res.status(400).json({
        success: false,
        message: 'Organization and position are required.',
      });
    }

    const newExp = await dataStore.create('experience', {
      organization: organization.trim(),
      position: position.trim(),
      employmentType: employmentType || 'Full-time',
      startDate: startDate || '',
      endDate: isCurrent ? 'Present' : endDate || '',
      isCurrent: Boolean(isCurrent),
      description: description || '',
      organizationUrl: organizationUrl || '',
      logo: logo || '',
      published: published !== undefined ? Boolean(published) : true,
      displayOrder: Number(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Experience entry created successfully.',
      data: newExp,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exp = await dataStore.findById('experience', id);

    if (!exp) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found.',
      });
    }

    const updates = { ...req.body };
    if (updates.isCurrent) {
      updates.endDate = 'Present';
    }

    const updated = await dataStore.findByIdAndUpdate('experience', id, updates);

    res.json({
      success: true,
      message: 'Experience updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dataStore.findByIdAndDelete('experience', id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found.',
      });
    }

    res.json({
      success: true,
      message: 'Experience entry deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
