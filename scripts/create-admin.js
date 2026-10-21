import dotenv from 'dotenv';
dotenv.config();

import readline from 'readline';
import bcrypt from 'bcryptjs';
import { connectDB } from '../server/src/config/db.js';
import { dataStore } from '../server/src/utils/dataStore.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const run = async () => {
  console.log('==============================================');
  console.log('🛡️  Create / Reset Administrator Account');
  console.log('==============================================');

  await connectDB();

  const email = (await question('Admin Email [default: mahmudsifat2793@gmail.com]: ')) || 'mahmudsifat2793@gmail.com';
  const name = (await question('Full Name [default: MD: Miel Mahmud Sifat]: ')) || 'MD: Miel Mahmud Sifat';
  const password = await question('Admin Password (min 8 characters): ');

  if (!password || password.length < 8) {
    console.error('❌ Password must be at least 8 characters long.');
    rl.close();
    process.exit(1);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const existing = await dataStore.findOne('admin', { email: email.toLowerCase().trim() });
  if (existing) {
    const id = existing._id || existing.id;
    await dataStore.findByIdAndUpdate('admin', id, {
      name,
      passwordHash,
    });
    console.log(`✅ Admin account updated for ${email}`);
  } else {
    await dataStore.create('admin', {
      email: email.toLowerCase().trim(),
      passwordHash,
      name,
      role: 'admin',
    });
    console.log(`✅ Admin account created for ${email}`);
  }

  rl.close();
  process.exit(0);
};

run().catch((err) => {
  console.error('❌ Error:', err);
  rl.close();
  process.exit(1);
});
