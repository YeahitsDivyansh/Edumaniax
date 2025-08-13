// connectionManagement.js
import { prisma } from './prisma.js';

/**
 * Kills idle database connections to prevent connection exhaustion
 * @param {number} idleMinutes - Minutes a connection must be idle before being terminated
 */
export async function killIdleConnections(idleMinutes = 10) {
  try {
    console.log(`🔍 Checking for idle connections (idle > ${idleMinutes} minutes)...`);
    
    // Kill idle connections
    const killedConnections = await prisma.$queryRaw`
      SELECT pg_terminate_backend(pid) as terminated, pid
      FROM pg_stat_activity 
      WHERE pid != pg_backend_pid()
      AND state = 'idle' 
      AND (now() - state_change) > interval '${idleMinutes} minutes'
    `;
    
    if (killedConnections.length > 0) {
      console.log(`💀 Killed ${killedConnections.length} idle connections`);
    } else {
      console.log('✅ No idle connections to kill');
    }
    
    // Kill idle in transaction connections (potentially stuck transactions)
    const killedTransactions = await prisma.$queryRaw`
      SELECT pg_terminate_backend(pid) as terminated, pid
      FROM pg_stat_activity 
      WHERE pid != pg_backend_pid()
      AND state = 'idle in transaction' 
      AND (now() - state_change) > interval '2 minutes'
    `;
    
    if (killedTransactions.length > 0) {
      console.log(`🔄 Killed ${killedTransactions.length} idle transactions`);
    }
    
  } catch (error) {
    console.error('❌ Error killing connections:', error.message);
  }
}

/**
 * Gets current database connection stats
 */
export async function getConnectionStats() {
  try {
    // Get max connections setting
    const maxConnResult = await prisma.$queryRaw`SHOW max_connections`;
    const maxConnections = parseInt(maxConnResult[0]?.max_connections || '100');
    
    // Get current connection count
    const connectionCountResult = await prisma.$queryRaw`
      SELECT count(*) as count FROM pg_stat_activity
    `;
    const currentConnections = parseInt(connectionCountResult[0]?.count || '0');
    
    // Get idle connections count
    const idleConnectionsResult = await prisma.$queryRaw`
      SELECT count(*) as count FROM pg_stat_activity WHERE state = 'idle'
    `;
    const idleConnections = parseInt(idleConnectionsResult[0]?.count || '0');
    
    return {
      maxConnections,
      currentConnections,
      idleConnections,
      availableConnections: maxConnections - currentConnections,
      usagePercentage: (currentConnections / maxConnections) * 100
    };
  } catch (error) {
    console.error('❌ Error getting connection stats:', error.message);
    return {
      error: error.message
    };
  }
}

/**
 * Emergency connection cleaner to be used when approaching connection limits
 */
export async function emergencyConnectionCleanup() {
  try {
    const stats = await getConnectionStats();
    
    // If we're using more than 80% of connections, aggressively clean up
    if (stats.usagePercentage > 80) {
      console.log(`⚠️ High connection usage (${stats.usagePercentage.toFixed(1)}%) - Emergency cleanup`);
      
      // Kill all idle connections regardless of how long they've been idle
      const killedConnections = await prisma.$queryRaw`
        SELECT pg_terminate_backend(pid) as terminated
        FROM pg_stat_activity 
        WHERE pid != pg_backend_pid()
        AND state = 'idle'
      `;
      
      console.log(`🧹 Emergency cleanup terminated ${killedConnections.length} connections`);
      return killedConnections.length;
    }
    
    return 0;
  } catch (error) {
    console.error('❌ Emergency cleanup failed:', error.message);
    return -1;
  }
}
