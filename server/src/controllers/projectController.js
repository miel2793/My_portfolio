import { dataStore } from '../utils/dataStore.js';
import { slugify } from '../utils/slugify.js';

export const getPublicProjects = async (req, res, next) => {
  try {
    const projects = await dataStore.find('project', { published: true }, { displayOrder: 1 });
    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicProjectBySlug = async (req, res, next) => {
  try {
    const project = await dataStore.findOne('project', {
      slug: req.params.slug.toLowerCase(),
      published: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await dataStore.find('project', {}, { displayOrder: 1 });
    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const {
      title,
      slug: customSlug,
      shortDescription,
      description,
      technologies,
      image,
      gallery,
      repositoryUrl,
      liveDemoUrl,
      featured,
      published,
      displayOrder,
    } = req.body;

    if (!title || !shortDescription || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, short description, and full description are required.',
      });
    }

    const slug = customSlug ? slugify(customSlug) : slugify(title);

    // Check duplicate slug
    const existing = await dataStore.findOne('project', { slug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A project with this slug or title already exists.',
      });
    }

    const techArray = Array.isArray(technologies)
      ? technologies
      : typeof technologies === 'string'
      ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const newProject = await dataStore.create('project', {
      title: title.trim(),
      slug,
      shortDescription: shortDescription.trim(),
      description,
      technologies: techArray,
      image: image || '',
      gallery: Array.isArray(gallery) ? gallery : [],
      repositoryUrl: repositoryUrl ? repositoryUrl.trim() : '',
      liveDemoUrl: liveDemoUrl ? liveDemoUrl.trim() : '',
      featured: Boolean(featured),
      published: published !== undefined ? Boolean(published) : true,
      displayOrder: Number(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await dataStore.findById('project', id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    const updates = { ...req.body };

    if (updates.title && !updates.slug) {
      updates.slug = slugify(updates.title);
    } else if (updates.slug) {
      updates.slug = slugify(updates.slug);
    }

    if (updates.technologies && typeof updates.technologies === 'string') {
      updates.technologies = updates.technologies.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const updated = await dataStore.findByIdAndUpdate('project', id, updates);

    res.json({
      success: true,
      message: 'Project updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dataStore.findByIdAndDelete('project', id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
