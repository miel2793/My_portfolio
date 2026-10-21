import { dataStore } from '../utils/dataStore.js';

export const getPublicEducation = async (req, res, next) => {
  try {
    const educationList = await dataStore.find('education', { published: true }, { displayOrder: 1 });
    
    // Privacy safeguard: Ensure no GPA/CGPA fields can ever leak
    const sanitized = educationList.map((edu) => {
      const { gpa, cgpa, grade, score, ...rest } = edu;
      return rest;
    });

    res.json({
      success: true,
      data: sanitized,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEducationAdmin = async (req, res, next) => {
  try {
    const educationList = await dataStore.find('education', {}, { displayOrder: 1 });
    res.json({
      success: true,
      data: educationList,
    });
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (req, res, next) => {
  try {
    const {
      institution,
      degree,
      field,
      startDate,
      endDate,
      description,
      published,
      displayOrder,
    } = req.body;

    if (!institution || !degree) {
      return res.status(400).json({
        success: false,
        message: 'Institution and degree are required.',
      });
    }

    const newEdu = await dataStore.create('education', {
      institution: institution.trim(),
      degree: degree.trim(),
      field: field ? field.trim() : '',
      startDate: startDate || '',
      endDate: endDate || '',
      description: description || '',
      published: published !== undefined ? Boolean(published) : true,
      displayOrder: Number(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Education entry created successfully.',
      data: newEdu,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const edu = await dataStore.findById('education', id);

    if (!edu) {
      return res.status(404).json({
        success: false,
        message: 'Education entry not found.',
      });
    }

    const updates = { ...req.body };
    delete updates.gpa;
    delete updates.cgpa;
    delete updates.grade;

    const updated = await dataStore.findByIdAndUpdate('education', id, updates);

    res.json({
      success: true,
      message: 'Education entry updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dataStore.findByIdAndDelete('education', id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Education entry not found.',
      });
    }

    res.json({
      success: true,
      message: 'Education entry deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
