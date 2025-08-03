import prisma from "../utils/prisma.js";

// Middleware to handle database connection errors
export const handleDatabaseErrors = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error("Database operation failed:", error.message);
      
      // Handle connection pool exhaustion
      if (error.message.includes("Too many database connections")) {
        console.log("🔄 Connection pool exhausted, retrying in 1 second...");
        
        // Wait a bit and retry once
        setTimeout(async () => {
          try {
            await fn(req, res, next);
          } catch (retryError) {
            console.error("Retry failed:", retryError.message);
            res.status(503).json({
              message: "Database temporarily unavailable. Please try again in a moment.",
              error: "CONNECTION_POOL_EXHAUSTED"
            });
          }
        }, 1000);
      } else {
        // Handle other database errors
        res.status(500).json({
          message: "Internal server error",
          error: error.message
        });
      }
    }
  };
};

// Connection health check
export const checkDatabaseHealth = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { healthy: true, message: "Database connection is healthy" };
  } catch (error) {
    return { 
      healthy: false, 
      message: "Database connection failed", 
      error: error.message 
    };
  }
};
