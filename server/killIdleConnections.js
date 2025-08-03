// killIdleConnections.js
import prisma from './utils/prisma.js';

async function killIdleConnections() {
  try {
    console.log('🔍 Checking for idle connections...');
    
    // Check current connections
    const activeConnections = await prisma.$queryRaw`
      SELECT pid, application_name, state, state_change, 
             (now() - state_change)::text as idle_duration
      FROM pg_stat_activity 
      WHERE application_name LIKE '%prisma%' OR application_name = ''
    `;
    
    console.log('📊 Found connections:', activeConnections.length);
    
    if (activeConnections.length > 0) {
      activeConnections.forEach(conn => {
        console.log(`- PID: ${conn.pid}, State: ${conn.state}, Idle: ${conn.idle_duration}`);
      });
    }
    
    // Kill idle connections older than 5 minutes (but not system processes)
    const killedConnections = await prisma.$queryRaw`
      SELECT pg_terminate_backend(pid) as terminated, pid
      FROM pg_stat_activity 
      WHERE pid != pg_backend_pid()
      AND pid > 100
      AND state = 'idle' 
      AND (now() - state_change) > interval '5 minutes'
    `;
    
    console.log('💀 Killed idle connections:', killedConnections.length);
    
    // Also kill connections that are in idle in transaction state
    const killedTransactions = await prisma.$queryRaw`
      SELECT pg_terminate_backend(pid) as terminated, pid
      FROM pg_stat_activity 
      WHERE pid != pg_backend_pid()
      AND pid > 100
      AND state = 'idle in transaction' 
      AND (now() - state_change) > interval '2 minutes'
    `;
    
    console.log('🔄 Killed idle transaction connections:', killedTransactions.length);
    
  } catch (error) {
    if (error.message?.includes('connection slots')) {
      console.log('❌ Cannot connect to database - connection slots full');
      console.log('💡 Try connecting directly to PostgreSQL and running:');
      console.log('   SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = \'idle\';');
    } else {
      console.error('❌ Error:', error.message);
    }
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Disconnected from database');
  }
}

killIdleConnections();
