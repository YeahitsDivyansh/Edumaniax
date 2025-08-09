// Test Payment Integration
const axios = require('axios');

const testPaymentIntegration = async () => {
  try {
    console.log('🔍 Testing Payment Integration...');
    
    // Test 1: Check feature status
    console.log('\n1. Checking payment feature status...');
    const featureResponse = await axios.get('http://localhost:3000/payment/feature-status');
    console.log('✅ Feature Status:', featureResponse.data);
    
    // Test 2: Test creating an order (will need userId)
    if (featureResponse.data.paymentEnabled) {
      console.log('\n2. Testing order creation...');
      try {
        const orderResponse = await axios.post('http://localhost:3000/payment/create-order', {
          userId: 'test-user-id',
          planType: 'PRO'
        });
        console.log('✅ Order Creation:', orderResponse.data);
      } catch (orderError) {
        console.log('⚠️ Order Creation Error:', orderError.response?.data || orderError.message);
      }
    }
    
    console.log('\n🎉 Payment integration test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

// Run the test
testPaymentIntegration();
