import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../server/src/config/db.js';
import { seedInitialDataIfEmpty } from '../server/scripts/seedHelper.js';

const run = async () => {
  console.log('[Seed Script] Connecting to database...');
  await connectDB();
  console.log('[Seed Script] Seeding data...');
  await seedInitialDataIfEmpty();
  console.log('[Seed Script] Seeding completed.');
  process.exit(0);
};

run().catch((err) => {
  console.error('[Seed Script] Failed:', err);
  process.exit(1);
});
