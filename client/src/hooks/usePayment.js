import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const usePayment = () => {
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  // Check if payment feature is enabled
  useEffect(() => {
    const checkFeatureStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/payment/feature-status`);
        setIsPaymentEnabled(response.data.paymentEnabled);
      } catch (err) {
        console.log('Payment feature check failed:', err.message);
        setIsPaymentEnabled(false);
      } finally {
        setLoading(false);
      }
    };

    checkFeatureStatus();
  }, []);

  const createOrder = async (userId, planType, selectedModule = null) => {
    if (!isPaymentEnabled) {
      throw new Error('Payment feature is currently disabled');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/payment/create-order`, {
        userId,
        planType,
        selectedModule
      });

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.error || 'Failed to create order');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (paymentData) => {
    if (!isPaymentEnabled) {
      throw new Error('Payment feature is currently disabled');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/payment/verify-payment`, paymentData);

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.error || 'Payment verification failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getUserSubscriptions = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/payment/subscriptions/${userId}`);

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.error || 'Failed to get subscriptions');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const processPayment = async (orderData, onSuccess, onError) => {
    if (!isPaymentEnabled) {
      throw new Error('Payment feature is currently disabled');
    }

    if (!window.Razorpay) {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay script failed to load');
      }
    }

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'EduManiax',
      description: `Subscription Plan`,
      order_id: orderData.orderId,
      handler: async function (response) {
        try {
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: orderData.userId || 'unknown'
          };

          const verificationResult = await verifyPayment(verificationData);
          onSuccess && onSuccess(verificationResult);
        } catch (error) {
          console.error('Payment verification error:', error);
          onError && onError(error);
        }
      },
      prefill: {
        name: 'Test User',
        email: 'test@edumaniax.com',
        contact: '9999999999'
      },
      notes: {
        country: 'IN',
        currency: 'INR'
      },
      theme: {
        color: '#068F36'
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
          onError && onError(new Error('Payment cancelled by user'));
        }
      }
    };

    console.log('Razorpay options:', options);

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return {
    isPaymentEnabled,
    loading,
    error,
    createOrder,
    verifyPayment,
    getUserSubscriptions,
    processPayment
  };
};

export default usePayment;
