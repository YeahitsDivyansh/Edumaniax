import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkUserSubscriptions() {
  try {
    console.log('Checking recent payments and subscriptions...');
    
    // Get recent payments
    const recentPayments = await prisma.payment.findMany({
      where: {
        status: 'COMPLETED',
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });
    
    console.log('Recent completed payments:', JSON.stringify(recentPayments, null, 2));
    
    // Get active subscriptions for recent payment users
    const userIds = [...new Set(recentPayments.map(p => p.userId))];
    
    for (const userId of userIds) {
      console.log(`\n--- User ${userId} subscriptions ---`);
      
      const subscriptions = await prisma.subscription.findMany({
        where: {
          userId: userId,
          status: 'ACTIVE'
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      console.log('Active subscriptions:', JSON.stringify(subscriptions, null, 2));
      
      // Check user details
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, phonenumber: true, selectedModule: true }
      });
      
      console.log('User details:', JSON.stringify(user, null, 2));
    }
    
  } catch (error) {
    console.error('Error checking subscriptions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserSubscriptions();
