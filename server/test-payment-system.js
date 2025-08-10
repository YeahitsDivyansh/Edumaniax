import axios from 'axios';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

// Test health endpoint
async function testHealthEndpoint() {
  try {
    console.log('Testing health endpoint...');
    const response = await axios.get(`${SERVER_URL}/api/health`);
    console.log('Health endpoint response:', response.data);
    console.log('Health check successful!');
    return true;
  } catch (error) {
    console.error('Health check failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return false;
  }
}

// Test feature status
async function testFeatureStatus() {
  try {
    console.log('\nTesting payment feature status...');
    const response = await axios.get(`${SERVER_URL}/payment/feature-status`);
    console.log('Feature status response:', response.data);
    
    if (!response.data.paymentEnabled) {
      console.log('\n⚠️ Payment feature is disabled! Enable it by setting PAYMENT_ENABLED=true in your .env file');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Feature status check failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return false;
  }
}

// Test order creation
async function testCreateOrder(userId, planType, selectedModule) {
  try {
    console.log('\nTesting order creation...');
    console.log(`Creating ${planType} order for user ${userId} with module ${selectedModule || 'none'}`);
    
    const response = await axios.post(`${SERVER_URL}/payment/create-order`, {
      userId,
      planType,
      selectedModule
    });
    
    console.log('Order created successfully!');
    console.log('Order details:', response.data);
    return response.data;
  } catch (error) {
    console.error('Order creation failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return null;
  }
}

// Cleanup test payments
async function cleanupTestPayments(userId) {
  try {
    console.log('\nCleaning up test payments...');
    const response = await axios.delete(`${SERVER_URL}/payment/cleanup-test-payments/${userId}`);
    console.log('Cleanup response:', response.data);
    return true;
  } catch (error) {
    console.error('Cleanup failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🧪 Starting payment system tests...\n');
  
  // Test health endpoint
  const healthCheck = await testHealthEndpoint();
  if (!healthCheck) {
    console.log('❌ Health check failed, stopping tests');
    rl.close();
    return;
  }
  
  // Test feature status
  const featureEnabled = await testFeatureStatus();
  if (!featureEnabled) {
    console.log('❌ Payment feature is disabled, stopping tests');
    rl.close();
    return;
  }
  
  // Ask for user ID
  rl.question('\nEnter user ID to test with: ', async (userId) => {
    // Ask for plan type
    rl.question('Enter plan type (SOLO, PRO, INSTITUTIONAL): ', async (planType) => {
      // Ask for selected module
      rl.question('Enter selected module (or press enter for none): ', async (selectedModule) => {
        // Create order
        const orderResult = await testCreateOrder(
          userId, 
          planType, 
          selectedModule ? selectedModule : null
        );
        
        if (!orderResult) {
          console.log('❌ Order creation failed, stopping tests');
          rl.close();
          return;
        }
        
        // Ask if user wants to clean up
        rl.question('\nDo you want to clean up test payments? (y/n): ', async (answer) => {
          if (answer.toLowerCase() === 'y') {
            await cleanupTestPayments(userId);
          }
          
          console.log('\n✅ Tests completed!');
          rl.close();
        });
      });
    });
  });
}

// Run the tests
runTests();
