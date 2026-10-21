import { dataStore } from '../utils/dataStore.js';

export const getPublicLeadership = async (req, res, next) => {
  try {
    const records = await dataStore.find('leadership', { visible: true }, { displayOrder: 1 });
    res.json({
      success: true,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllLeadershipAdmin = async (req, res, next) => {
  try {
    const records = await dataStore.find('leadership', {}, { displayOrder: 1 });
    res.json({
      success: true,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export const createLeadership = async (req, res, next) => {
  try {
    const {
      organization,
      role,
      description,
      startDate,
      endDate,
      organizationUrl,
      image,
      visible,
      displayOrder,
    } = req.body;

    if (!organization || !role) {
      return res.status(400).json({
        success: false,
        message: 'Organization and role are required.',
      });
    }

    const newRec = await dataStore.create('leadership', {
      organization: organization.trim(),
      role: role.trim(),
      description: description || '',
      startDate: startDate || '',
      endDate: endDate || '',
      organizationUrl: organizationUrl || '',
      image: image || '',
      visible: visible !== undefined ? Boolean(visible) : true,
      displayOrder: Number(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Leadership/Volunteering record created successfully.',
      data: newRec,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLeadership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rec = await dataStore.findById('leadership', id);

    if (!rec) {
      return res.status(404).json({
        success: false,
        message: 'Record not found.',
      });
    }

    const updated = await dataStore.findByIdAndUpdate('leadership', id, req.body);

    res.json({
      success: true,
      message: 'Record updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLeadership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dataStore.findByIdAndDelete('leadership', id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Record not found.',
      });
    }

    res.json({
      success: true,
      message: 'Record deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
