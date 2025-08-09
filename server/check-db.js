// Simple script to check if selectedModule exists in User model
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Check database connection
    console.log('Checking database connection...');
    await prisma.$connect();
    console.log('Database connected successfully');

    // Get database structure
    console.log('\nChecking User model structure:');
    const users = await prisma.user.findMany({
      take: 1,
      select: {
        id: true,
        name: true,
        selectedModule: true
      }
    });

    console.log('Successfully queried User with selectedModule field');
    console.log('User data sample:', users);
    
    // If we got here, the selectedModule field exists
    console.log('\nThe selectedModule field exists in the User model!');
    
  } catch (error) {
    console.error('Error accessing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
