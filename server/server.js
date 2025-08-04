import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { prismaMiddleware } from "./utils/prisma.js";
import userRoutes from "./routes/userRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import DMRoutes from "./routes/DMRoutes.js";
import communicationRoutes from "./routes/communicationRoutes.js";
import computersRoutes from "./routes/computersRoutes.js";
import entreprenerushipRoutes from "./routes/entreprenerushipRoutes.js";
import envirnomentRoutes from "./routes/envirnomentRoutes.js";
import lawRoutes from "./routes/lawRoutes.js";
import leadershipRoutes from "./routes/leadershipRoutes.js";
import SELRoutes from "./routes/SELRoutes.js";
import performanceRoutes from './routes/performanceRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Add Prisma middleware to manage database connections
app.use(async (req, res, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error in request:", error);
    
    // Check if it's a database connection error
    if (error.message?.includes('connection') || error.message?.includes('FATAL')) {
      res.status(503).json({ 
        error: "Database temporarily unavailable. Please try again in a moment.",
        message: "Service temporarily unavailable"
      });
    } else {
      res.status(500).json({ 
        error: "An internal server error occurred",
        message: process.env.NODE_ENV === "production" ? null : error.message
      });
    }
  }
});

app.use("/", userRoutes);
app.use("/finance", financeRoutes);
app.use("/digital-marketing", DMRoutes);
app.use("/communication", communicationRoutes);
app.use("/computers", computersRoutes);
app.use("/entrepreneruship", entreprenerushipRoutes); 
app.use("/envirnoment", envirnomentRoutes);
app.use("/law", lawRoutes); 
app.use("/leadership", leadershipRoutes);
app.use("/sel", SELRoutes);
app.use("/performance", performanceRoutes);
app.use("/blogs", blogRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ 
    error: "An internal server error occurred",
    message: process.env.NODE_ENV === "production" ? null : err.message
  });
});

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed');
    // prisma.$disconnect is already handled in prisma.js
    process.exit(0);
  });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Keep the process alive but log the error
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Keep the process alive but log the error
});
