import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../src/config/db.js';
import { seedInitialDataIfEmpty } from './seedHelper.js';

const run = async () => {
  console.log('[Seed Script] Connecting to database...');
  await connectDB();
  console.log('[Seed Script] Seeding initial portfolio content...');
  await seedInitialDataIfEmpty();
  console.log('[Seed Script] Seeding completed successfully.');
  process.exit(0);
};

run().catch((err) => {
  console.error('[Seed Script] Failed:', err);
  process.exit(1);
});
