import { dataStore } from '../utils/dataStore.js';

export const getPublicSkills = async (req, res, next) => {
  try {
    const skills = await dataStore.find('skill', { visible: true }, { displayOrder: 1 });
    
    // Group by category
    const categorized = {
      'Development and Technical Skills': [],
      'Tools and Productivity': [],
      'Professional Skills': [],
    };

    skills.forEach((skill) => {
      if (categorized[skill.category]) {
        categorized[skill.category].push(skill);
      } else {
        categorized[skill.category] = [skill];
      }
    });

    res.json({
      success: true,
      data: skills,
      categorized,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSkillsAdmin = async (req, res, next) => {
  try {
    const skills = await dataStore.find('skill', {}, { displayOrder: 1 });
    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const { name, category, isPrimary, displayOrder, visible } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: 'Skill name and category are required.',
      });
    }

    const newSkill = await dataStore.create('skill', {
      name: name.trim(),
      category: category.trim(),
      isPrimary: Boolean(isPrimary),
      displayOrder: Number(displayOrder) || 0,
      visible: visible !== undefined ? Boolean(visible) : true,
    });

    res.status(201).json({
      success: true,
      message: 'Skill created successfully.',
      data: newSkill,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await dataStore.findById('skill', id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found.',
      });
    }

    const updated = await dataStore.findByIdAndUpdate('skill', id, req.body);

    res.json({
      success: true,
      message: 'Skill updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dataStore.findByIdAndDelete('skill', id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found.',
      });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
