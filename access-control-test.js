/**
 * Test Script for Access Control Logic
 * Run this to verify SOLO plan users have access to all levels of their selected module
 */

// Simulate the access control class (this would normally be imported)
class AccessControllerTest {
  constructor(userSubscription, selectedModule) {
    this.userSubscription = userSubscription;
    this.selectedModule = selectedModule;
    this.currentPlan = this.getCurrentPlan();
  }

  getCurrentPlan() {
    if (!this.userSubscription || !Array.isArray(this.userSubscription)) {
      return 'STARTER';
    }

    const activeSubscriptions = this.userSubscription.filter(sub => 
      sub.status === 'ACTIVE' && new Date(sub.endDate) > new Date()
    );

    if (activeSubscriptions.length === 0) {
      return 'STARTER';
    }

    const planHierarchy = ['STARTER', 'SOLO', 'PRO', 'INSTITUTIONAL'];
    for (const plan of planHierarchy.reverse()) {
      if (activeSubscriptions.some(sub => sub.planType === plan)) {
        return plan;
      }
    }

    return 'STARTER';
  }

  hasModuleAccess(moduleKey) {
    if (this.currentPlan === 'STARTER') {
      return true; // Trial access to all modules
    }

    if (this.currentPlan === 'SOLO') {
      return this.selectedModule === moduleKey;
    }

    return true; // PRO and INSTITUTIONAL have access to all modules
  }

  hasLevelAccess(moduleKey, levelNumber) {
    if (!this.hasModuleAccess(moduleKey)) return false;

    if (this.currentPlan === 'STARTER') {
      return levelNumber === 1; // Only level 1 during trial
    }

    // SOLO plan users have access to ALL levels of their selected module
    if (this.currentPlan === 'SOLO') {
      return this.selectedModule === moduleKey;
    }

    return true; // PRO and INSTITUTIONAL have access to all levels
  }
}

// Test Scenarios
console.log('=== Access Control Test Results ===\n');

// Scenario 1: SOLO plan user with leadership module selected
const soloUser = new AccessControllerTest([
  {
    status: 'ACTIVE',
    planType: 'SOLO',
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  }
], 'leadership');

console.log('SOLO Plan User (Leadership Module Selected):');
console.log(`- Current Plan: ${soloUser.currentPlan}`);
console.log(`- Selected Module: ${soloUser.selectedModule}`);
console.log(`- Has Leadership Module Access: ${soloUser.hasModuleAccess('leadership')}`);
console.log(`- Has Finance Module Access: ${soloUser.hasModuleAccess('finance')}`);
console.log(`- Leadership Level 1 Access: ${soloUser.hasLevelAccess('leadership', 1)}`);
console.log(`- Leadership Level 2 Access: ${soloUser.hasLevelAccess('leadership', 2)}`);
console.log(`- Leadership Level 3 Access: ${soloUser.hasLevelAccess('leadership', 3)}`);
console.log(`- Finance Level 1 Access: ${soloUser.hasLevelAccess('finance', 1)}`);

console.log('\n' + '='.repeat(50) + '\n');

// Scenario 2: STARTER plan user
const starterUser = new AccessControllerTest([
  {
    status: 'ACTIVE',
    planType: 'STARTER',
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }
], null);

console.log('STARTER Plan User:');
console.log(`- Current Plan: ${starterUser.currentPlan}`);
console.log(`- Has Leadership Module Access: ${starterUser.hasModuleAccess('leadership')}`);
console.log(`- Has Finance Module Access: ${starterUser.hasModuleAccess('finance')}`);
console.log(`- Leadership Level 1 Access: ${starterUser.hasLevelAccess('leadership', 1)}`);
console.log(`- Leadership Level 2 Access: ${starterUser.hasLevelAccess('leadership', 2)}`);
console.log(`- Finance Level 1 Access: ${starterUser.hasLevelAccess('finance', 1)}`);
console.log(`- Finance Level 2 Access: ${starterUser.hasLevelAccess('finance', 2)}`);

console.log('\n' + '='.repeat(50) + '\n');

// Scenario 3: PRO plan user
const proUser = new AccessControllerTest([
  {
    status: 'ACTIVE',
    planType: 'PRO',
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }
], null);

console.log('PRO Plan User:');
console.log(`- Current Plan: ${proUser.currentPlan}`);
console.log(`- Has Leadership Module Access: ${proUser.hasModuleAccess('leadership')}`);
console.log(`- Has Finance Module Access: ${proUser.hasModuleAccess('finance')}`);
console.log(`- Leadership Level 1 Access: ${proUser.hasLevelAccess('leadership', 1)}`);
console.log(`- Leadership Level 2 Access: ${proUser.hasLevelAccess('leadership', 2)}`);
console.log(`- Leadership Level 3 Access: ${proUser.hasLevelAccess('leadership', 3)}`);

console.log('\n=== Test Complete ===');
