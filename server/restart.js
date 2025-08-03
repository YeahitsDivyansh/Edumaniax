// restart.js
import { spawn } from 'child_process';
import prisma from './utils/prisma.js';

async function gracefulRestart() {
  console.log('🔄 Starting graceful server restart...');
  
  try {
    // First, clean up any lingering database connections
    console.log('🧹 Cleaning up database connections...');
    await prisma.$disconnect();
    
    // Kill any idle connections
    console.log('💀 Killing idle database connections...');
    const killProcess = spawn('node', ['killIdleConnections.js'], {
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    
    await new Promise((resolve, reject) => {
      killProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Kill process exited with code ${code}`));
        }
      });
    });
    
    console.log('🚀 Starting server...');
    const serverProcess = spawn('node', ['server.js'], {
      cwd: process.cwd(),
      stdio: 'inherit',
      detached: true
    });
    
    // Let the parent process exit, allowing the server to run independently
    serverProcess.unref();
    
    console.log('✅ Server restarted successfully');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Restart failed:', error.message);
    process.exit(1);
  }
}

gracefulRestart();
