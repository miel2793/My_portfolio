import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { getIsConnected } from '../config/db.js';

import { Admin } from '../models/Admin.js';
import { Project } from '../models/Project.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';
import { Skill } from '../models/Skill.js';
import { Leadership } from '../models/Leadership.js';
import { BlogPost } from '../models/BlogPost.js';
import { Message } from '../models/Message.js';
import { SiteSettings } from '../models/SiteSettings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../../data/local_db.json');
const TMP_DB_FILE = path.join(os.tmpdir(), 'local_db.json');
let activeDbFile = DB_FILE;

const models = {
  admin: Admin,
  project: Project,
  experience: Experience,
  education: Education,
  skill: Skill,
  leadership: Leadership,
  blog: BlogPost,
  message: Message,
  settings: SiteSettings,
};

let localDb = {
  admin: [],
  project: [],
  experience: [],
  education: [],
  skill: [],
  leadership: [],
  blog: [],
  message: [],
  settings: null,
};

// Load from file if exists
const loadLocalDb = () => {
  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const raw = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      localDb = JSON.parse(raw);
      activeDbFile = TMP_DB_FILE;
      return;
    }
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      localDb = JSON.parse(raw);
    }
  } catch (err) {
    console.error('[DataStore] Error loading local_db.json:', err.message);
  }
};

const saveLocalDb = () => {
  try {
    fs.writeFileSync(activeDbFile, JSON.stringify(localDb, null, 2), 'utf-8');
  } catch (err) {
    if (activeDbFile !== TMP_DB_FILE) {
      try {
        activeDbFile = TMP_DB_FILE;
        fs.writeFileSync(activeDbFile, JSON.stringify(localDb, null, 2), 'utf-8');
      } catch (tmpErr) {
        console.warn('[DataStore] Warning: could not write local DB cache to /tmp:', tmpErr.message);
      }
    } else {
      console.warn('[DataStore] Warning: could not save local DB:', err.message);
    }
  }
};

loadLocalDb();

const generateId = () => {
  return new mongoose.Types.ObjectId().toString();
};

export const dataStore = {
  async find(entity, filter = {}, sort = { createdAt: -1 }) {
    if (getIsConnected()) {
      const Model = models[entity];
      return Model.find(filter).sort(sort).lean();
    }

    let items = [...(localDb[entity] || [])];
    items = items.filter((item) => {
      for (const key of Object.keys(filter)) {
        if (filter[key] !== undefined && item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });

    if (sort) {
      const [field, direction] = Object.entries(sort)[0] || ['createdAt', -1];
      items.sort((a, b) => {
        if (a[field] < b[field]) return direction === 1 ? -1 : 1;
        if (a[field] > b[field]) return direction === 1 ? 1 : -1;
        return 0;
      });
    }

    return items;
  },

  async findOne(entity, filter = {}) {
    if (getIsConnected()) {
      const Model = models[entity];
      if (entity === 'admin') {
        return Model.findOne(filter);
      }
      return Model.findOne(filter).lean();
    }

    if (entity === 'settings') {
      return localDb.settings;
    }

    const items = localDb[entity] || [];
    const found = items.find((item) => {
      for (const key of Object.keys(filter)) {
        if (filter[key] !== undefined && item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });

    return found ? { ...found } : null;
  },

  async findById(entity, id) {
    if (getIsConnected()) {
      const Model = models[entity];
      return Model.findById(id).lean();
    }

    const items = localDb[entity] || [];
    const found = items.find((item) => item._id === id || item.id === id);
    return found ? { ...found } : null;
  },

  async create(entity, data) {
    if (getIsConnected()) {
      const Model = models[entity];
      return Model.create(data);
    }

    const now = new Date();
    const newItem = {
      _id: generateId(),
      ...data,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    if (entity === 'settings') {
      localDb.settings = newItem;
    } else {
      if (!localDb[entity]) localDb[entity] = [];
      localDb[entity].push(newItem);
    }

    saveLocalDb();
    return newItem;
  },

  async findByIdAndUpdate(entity, id, updateData) {
    if (getIsConnected()) {
      const Model = models[entity];
      return Model.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
    }

    if (entity === 'settings') {
      localDb.settings = {
        ...(localDb.settings || {}),
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      saveLocalDb();
      return localDb.settings;
    }

    const items = localDb[entity] || [];
    const index = items.findIndex((item) => item._id === id || item.id === id);
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    saveLocalDb();
    return items[index];
  },

  async findByIdAndDelete(entity, id) {
    if (getIsConnected()) {
      const Model = models[entity];
      return Model.findByIdAndDelete(id);
    }

    const items = localDb[entity] || [];
    const index = items.findIndex((item) => item._id === id || item.id === id);
    if (index === -1) return null;

    const [deleted] = items.splice(index, 1);
    saveLocalDb();
    return deleted;
  },

  async countDocuments(entity, filter = {}) {
    if (getIsConnected()) {
      const Model = models[entity];
      return Model.countDocuments(filter);
    }

    const items = await this.find(entity, filter);
    return items.length;
  },

  getLocalDb() {
    return localDb;
  },

  setLocalDb(data) {
    localDb = data;
    saveLocalDb();
  },
};
