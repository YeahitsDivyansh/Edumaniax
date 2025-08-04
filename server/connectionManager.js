// connectionManager.js
import prisma from './utils/prisma.js';

class ConnectionManager {
  constructor() {
    this.connectionQueue = [];
    this.isProcessing = false;
  }

  async executeWithRetry(operation, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        console.log(`Attempt ${attempt} failed:`, error.message);
        
        if (error.message?.includes('connection slots') || error.message?.includes('FATAL')) {
          if (attempt === maxRetries) {
            throw new Error('Database is temporarily unavailable. Please try again later.');
          }
          
          // Wait longer between retries
          const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Exponential backoff, max 10s
          console.log(`Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw error; // Re-throw non-connection errors immediately
        }
      }
    }
  }

  async safeQuery(queryFn) {
    return this.executeWithRetry(async () => {
      const result = await queryFn();
      return result;
    });
  }
}

const connectionManager = new ConnectionManager();
export default connectionManager;
