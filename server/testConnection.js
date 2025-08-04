// testConnection.js
import prisma from './utils/prisma.js';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Simple test query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database connection successful:', result);
    
    // Check connection count
    const connections = await prisma.$queryRaw`
      SELECT count(*) as active_connections 
      FROM pg_stat_activity 
      WHERE state = 'active'
    `;
    console.log('📊 Active connections:', connections[0]?.active_connections);
    
    // Check max connections
    const maxConnections = await prisma.$queryRaw`SHOW max_connections`;
    console.log('🔢 Max connections allowed:', maxConnections[0]?.max_connections);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    if (error.message?.includes('connection slots')) {
      console.log('\n💡 Solutions:');
      console.log('1. Wait a few minutes for connections to close');
      console.log('2. Contact your database administrator to increase max_connections');
      console.log('3. Implement connection pooling (PgBouncer)');
      console.log('4. Check for connection leaks in your application');
    }
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Disconnected from database');
  }
}

testConnection();
