// maintenance.js
import prisma from './utils/prisma.js';

async function runMaintenance() {
  console.log('🔧 Starting database maintenance...');
  
  try {
    // Check connection status
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database is accessible');
    
    // Get connection info
    const connections = await prisma.$queryRaw`
      SELECT count(*) as total_connections,
             count(*) FILTER (WHERE state = 'active') as active_connections,
             count(*) FILTER (WHERE state = 'idle') as idle_connections
      FROM pg_stat_activity
    `;
    
    console.log('📊 Connection Stats:', connections[0]);
    
    // Kill very old idle connections (older than 1 hour)
    const killedOld = await prisma.$queryRaw`
      SELECT pg_terminate_backend(pid) as terminated, pid
      FROM pg_stat_activity 
      WHERE pid != pg_backend_pid()
      AND pid > 100
      AND state = 'idle' 
      AND (now() - state_change) > interval '1 hour'
    `;
    
    if (killedOld.length > 0) {
      console.log(`💀 Killed ${killedOld.length} very old idle connections`);
    }
    
    // Kill idle in transaction connections older than 5 minutes
    const killedTransactions = await prisma.$queryRaw`
      SELECT pg_terminate_backend(pid) as terminated, pid
      FROM pg_stat_activity 
      WHERE pid != pg_backend_pid()
      AND pid > 100
      AND state = 'idle in transaction' 
      AND (now() - state_change) > interval '5 minutes'
    `;
    
    if (killedTransactions.length > 0) {
      console.log(`🔄 Killed ${killedTransactions.length} idle transaction connections`);
    }
    
    console.log('✅ Maintenance completed successfully');
    
  } catch (error) {
    console.error('❌ Maintenance failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

runMaintenance();
