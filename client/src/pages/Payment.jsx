import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, CheckCircle, XCircle, Loader2, ArrowLeft, Shield } from 'lucide-react';
import usePayment from '../hooks/usePayment';

const PLAN_DETAILS = {
  STARTER: {
    name: 'Starter Plan',
    price: 0,
    duration: '7 Days Free Trial',
    features: [
      'Access to 1 free game/module',
      'Notes for the selected module',
      'Access to basic learning tools',
      'Limited to 7 days trial period'
    ]
  },
  SOLO: {
    name: 'Solo Plan',
    price: 199,
    duration: '1 Month',
    features: [
      'Access to 1 premium module of choice',
      'Notes for the selected module',
      'Interactive activities and assessments',
      'Completion certificates'
    ]
  },
  PRO: {
    name: 'Pro Plan',
    price: 1433,
    duration: '6 Months',
    features: [
      'Access to all premium modules',
      'Notes for every module',
      'All interactive games and assessments',
      'AI powered personalized assessment',
      'Completion certificates for all modules'
    ],
    popular: true
  },
  INSTITUTIONAL: {
    name: 'Institutional Plan',
    price: 'Custom',
    duration: 'Custom',
    features: [
      'Access for 30+ users',
      'All modules notes & games included',
      'Custom onboarding & priority support',
      'Live Lectures by SME',
      'AI powered personalized assessment',
      'Completion certificates'
    ]
  }
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPaymentEnabled, loading, error, createOrder, processPayment } = usePayment();
  
  const [selectedPlan, setSelectedPlan] = useState('PRO');
  const [selectedModule, setSelectedModule] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  
  const AVAILABLE_MODULES = [
    'Entrepreneurship',
    'Leadership',
    'Anger Management',
    'Counseling',
    'Mathematics',
    'Science',
    'Language Arts',
    'Social Studies'
  ];

  // Get plan from URL params or default to PRO
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const planFromUrl = urlParams.get('plan');
    if (planFromUrl && PLAN_DETAILS[planFromUrl]) {
      setSelectedPlan(planFromUrl);
    }
  }, [location]);

  // Get user info from localStorage or context
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUserInfo(JSON.parse(userData));
    }
  }, []);

  // Show loading while payment configuration is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border-4 border-green-400">
          <Loader2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-bold text-green-800 mb-2">Loading Payment...</h1>
          <p className="text-green-700 mb-4">
            Please wait while we prepare your payment options.
          </p>
        </div>
      </div>
    );
  }

  // Check if payment feature is disabled - only after loading is complete
  if (!isPaymentEnabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border-4 border-gray-400">
          <XCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Feature Disabled</h1>
          <p className="text-gray-700 mb-4">
            Payment functionality is currently not available.
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-full"
          >
            View Plans
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!userInfo.id) {
      alert('Please login to continue with payment');
      navigate('/login');
      return;
    }

    if (selectedPlan === 'STARTER') {
      alert('Starter plan is free! You already have access.');
      navigate('/dashboard');
      return;
    }

    if (selectedPlan === 'INSTITUTIONAL') {
      alert('Please contact us for institutional pricing');
      return;
    }
    
    // Require module selection for SOLO plan
    if (selectedPlan === 'SOLO' && !selectedModule) {
      alert('Please select a module for your SOLO plan');
      return;
    }

    try {
      setPaymentStatus('processing');
      
      // Create order - pass selectedModule only for SOLO plan
      const orderData = await createOrder(
        userInfo.id, 
        selectedPlan, 
        selectedPlan === 'SOLO' ? selectedModule : null
      );
      
      // Process payment using Razorpay
      await processPayment(
        orderData,
        () => {
          setPaymentStatus('success');
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        },
        (error) => {
          console.error('Payment error:', error);
          setPaymentStatus('failed');
        }
      );
      
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentStatus('failed');
    }
  };

  const currentPlan = PLAN_DETAILS[selectedPlan];

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border-4 border-green-400">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-green-800 mb-2">Payment Successful! 🎉</h1>
          <p className="text-green-700 mb-4">
            Your {currentPlan.name} subscription is now active.
          </p>
          <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-300 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border-4 border-red-400">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-800 mb-2">Payment Failed</h1>
          <p className="text-red-700 mb-4">
            {error || 'Something went wrong with your payment.'}
          </p>
          <button
            onClick={() => setPaymentStatus(null)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 mb-4"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-700">{currentPlan.name}</span>
                  <span className="font-bold text-gray-900">
                    {typeof currentPlan.price === 'number' ? `₹${currentPlan.price}` : currentPlan.price}
                  </span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">
                      {typeof currentPlan.price === 'number' ? `₹${currentPlan.price}` : currentPlan.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="mt-6 flex items-start gap-3 text-sm text-gray-600">
                <Shield size={20} className="text-green-500 mt-0.5" />
                <div>
                  <p className="font-semibold">Secure Payment</p>
                  <p>Your payment information is encrypted and secure. Powered by Razorpay.</p>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="flex flex-col justify-center">
              <div className="text-center">
                <CreditCard className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Ready to unlock premium features?
                </h3>
                <p className="text-gray-600 mb-6">
                  Start your {currentPlan.name} subscription today
                </p>

                {/* Module selection for SOLO plan */}
                {selectedPlan === 'SOLO' && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 text-left">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Select Your Module
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      With the SOLO plan, you get access to one premium module of your choice.
                    </p>
                    <select
                      value={selectedModule}
                      onChange={(e) => setSelectedModule(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Select a module...</option>
                      {AVAILABLE_MODULES.map((module) => (
                        <option key={module} value={module}>
                          {module}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={loading || paymentStatus === 'processing'}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading || paymentStatus === 'processing' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Pay {typeof currentPlan.price === 'number' ? `₹${currentPlan.price}` : 'Now'}
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-red-600 text-sm mt-2">{error}</p>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">We accept</p>
          <div className="flex justify-center items-center gap-4">
            <img src="/pricingDesign/cards.svg" alt="Credit Cards" className="h-8" />
            <img src="/pricingDesign/UPI-Logo-vector.svg" alt="UPI" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
