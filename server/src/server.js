import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { seedInitialDataIfEmpty } from '../scripts/seedHelper.js';

const PORT = process.env.PORT || 5000;
const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT
);

let initPromise = null;
const initServer = async () => {
  if (!initPromise) {
    initPromise = (async () => {
      try {
        await connectDB();
        await seedInitialDataIfEmpty();
      } catch (err) {
        console.error('[Server] Initialization warning:', err.message);
      }
    })();
  }
  return initPromise;
};

if (isServerless) {
  // Serverless function execution (e.g. Vercel)
  initServer();
} else {
  // Standalone server execution
  const startServer = async () => {
    try {
      await initServer();

      const server = app.listen(PORT, () => {
        console.log(`====================================================`);
        console.log(`🚀 MD: Miel Mahmud Sifat Portfolio API Server Running`);
        console.log(`📡 URL: http://localhost:${PORT}`);
        console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
        console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`====================================================`);
      });

      const shutdown = () => {
        console.log('\n[Server] Gracefully shutting down...');
        server.close(() => {
          console.log('[Server] Closed remaining connections.');
          process.exit(0);
        });
      };

      process.on('SIGTERM', shutdown);
      process.on('SIGINT', shutdown);
    } catch (error) {
      console.error('[Server] Fatal startup error:', error);
      process.exit(1);
    }
  };

  startServer();
}

export default app;
