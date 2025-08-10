import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Star, Coins, ArrowLeft, Crown, Zap } from "lucide-react";
import { usePayment } from "../hooks/usePayment";

const PaymentRequired = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPaymentEnabled } = usePayment();
  
  const [requiredPlan, setRequiredPlan] = useState('PRO');
  const [redirectPath, setRedirectPath] = useState('/dashboard');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const planFromUrl = urlParams.get('plan');
    const redirectFromUrl = urlParams.get('redirect');
    
    if (planFromUrl) setRequiredPlan(planFromUrl);
    if (redirectFromUrl) setRedirectPath(redirectFromUrl);
  }, [location]);

  const currentAccess = 'STARTER'; // Default to starter for now

  const planDetails = {
    SOLO: {
      name: 'Solo Plan',
      price: '₹199',
      duration: '3 months',
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      color: 'from-blue-100 to-blue-200',
      borderColor: 'border-blue-400'
    },
    PRO: {
      name: 'Pro Plan', 
      price: '₹1,433',
      duration: '3 months',
      icon: <Crown className="w-8 h-8 text-purple-500" />,
      color: 'from-purple-100 to-purple-200',
      borderColor: 'border-purple-400'
    },
    INSTITUTIONAL: {
      name: 'Institutional Plan',
      price: 'Custom',
      duration: 'Custom',
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      color: 'from-yellow-100 to-yellow-200', 
      borderColor: 'border-yellow-400'
    }
  };

  const currentPlan = planDetails[requiredPlan] || planDetails.PRO;

  const handleUpgrade = () => {
    if (!isPaymentEnabled) {
      alert('Payment feature is currently disabled. Please try again later.');
      return;
    }
    navigate(`/payment?plan=${requiredPlan}&redirect=${encodeURIComponent(redirectPath)}`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentPlan.color} flex items-center justify-center px-4 py-8`}>
      <div className={`max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border-4 ${currentPlan.borderColor} relative overflow-hidden`}>
        
        {/* Animated Background Elements */}
        <div className="absolute top-4 left-4 text-yellow-400 text-3xl animate-ping">✨</div>
        <div className="absolute top-6 right-6 text-pink-400 text-3xl animate-bounce">🌈</div>
        <div className="absolute bottom-4 left-6 text-blue-400 text-2xl animate-pulse">💎</div>
        <div className="absolute bottom-6 right-4 text-green-400 text-2xl animate-bounce">🚀</div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            {/* Plan Icon */}
            <div className="mb-6">
              {currentPlan.icon}
            </div>

            {/* Lock Icon */}
            <div className="text-6xl mb-6">🔒</div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Upgrade to {currentPlan.name}
            </h1>
            
            <p className="text-gray-600 text-lg sm:text-xl mb-2">
              This premium content requires {currentPlan.name} access
            </p>
            
            <p className="text-gray-500 text-sm sm:text-base mb-8">
              Currently on: <span className="font-semibold">{currentAccess} Plan</span>
            </p>

            {/* Upgrade Benefits */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-dashed border-green-300 p-6 rounded-2xl mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-bold text-green-800">Unlock Premium Benefits</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  All Premium Modules
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  AI-Powered Assessments
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Completion Certificates
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Interactive Games
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Progress Tracking
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Priority Support
                </div>
              </div>
            </div>

            {/* Pricing Display */}
            <div className="mb-8">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {currentPlan.price}
              </div>
              <div className="text-gray-600">
                for {currentPlan.duration}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft size={20} />
                Go Back
              </button>

              <button
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Coins size={20} />
                Upgrade Now
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Lock size={16} />
                Secure Payment
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} />
                Instant Access
              </div>
              <div className="flex items-center gap-1">
                <Zap size={16} />
                Money-back Guarantee
              </div>
            </div>

            {/* Fun Fact */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Star className="text-yellow-400" size={18} />
                <span className="font-semibold">Did you know?</span>
              </div>
              <p className="text-blue-600 text-sm mt-1">
                Students with premium access show 3x faster skill development! 🚀✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequired;
