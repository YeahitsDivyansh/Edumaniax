// addEmailField.js
import prisma from './utils/prisma.js';

async function addEmailField() {
  try {
    // First check if the column already exists to avoid errors
    console.log('Checking if email column already exists...');
    const result = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='User' AND column_name='email';
    `;
    
    if (result.length > 0) {
      console.log('Email column already exists. No changes needed.');
      return;
    }
    
    // Add the email column if it doesn't exist
    console.log('Adding email column to User table...');
    await prisma.$executeRaw`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "email" TEXT;`;
    console.log('Successfully added email column!');
  } catch (error) {
    console.error('Error adding email column:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
addEmailField()
  .then(() => {
    console.log('Operation completed.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
