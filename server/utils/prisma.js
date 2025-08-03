import { PrismaClient } from "@prisma/client";

// Create a singleton Prisma client instance
let prisma;

const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error", "warn"] : ["query", "error", "warn"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Connection pool optimization
    __internal: {
      engine: {
        endpoint: process.env.DATABASE_URL,
      },
    },
  });
};

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  // In development, use a global variable to preserve the instance
  // across hot reloads
  if (!globalThis.__prisma) {
    globalThis.__prisma = createPrismaClient();
  }
  prisma = globalThis.__prisma;
}

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;
