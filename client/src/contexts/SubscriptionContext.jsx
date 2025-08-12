import React, { createContext, useState, useEffect } from 'react';
import usePayment from '../hooks/usePayment';
import { forceRefreshSubscriptions } from '../utils/subscriptionRefresh';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [userAccess, setUserAccess] = useState({});
  const [loading, setLoading] = useState(false);
  const { checkSubscription, getSubscriptions } = usePayment();

  // Check if user has access to a specific plan
  const hasAccess = (planType) => {
    return userAccess[planType]?.hasAccess || planType === 'STARTER';
  };

  // Check if user has any premium access
  const hasPremiumAccess = () => {
    return Object.values(userAccess).some(access => access.hasAccess);
  };

  // Get active subscription for a plan type
  const getActiveSubscription = (planType) => {
    return userAccess[planType]?.subscription || null;
  };

  // Refresh user subscriptions
  const refreshSubscriptions = async (userId) => {
    if (!userId) return;

    try {
      setLoading(true);
      
      // Get all subscriptions
      const userSubscriptions = await getSubscriptions(userId);
      setSubscriptions(userSubscriptions);

      // Check access for each plan type
      const planTypes = ['STARTER', 'SOLO', 'PRO', 'INSTITUTIONAL'];
      const accessChecks = await Promise.all(
        planTypes.map(async (planType) => {
          const access = await checkSubscription(userId, planType);
          return { planType, access };
        })
      );

      // Update user access state
      const newUserAccess = {};
      accessChecks.forEach(({ planType, access }) => {
        newUserAccess[planType] = access;
      });
      setUserAccess(newUserAccess);

    } catch (error) {
      console.error('Error refreshing subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get highest tier access
  const getHighestTierAccess = () => {
    const tiers = ['INSTITUTIONAL', 'PRO', 'SOLO', 'STARTER'];
    for (const tier of tiers) {
      if (hasAccess(tier)) {
        return tier;
      }
    }
    return 'STARTER';
  };

  // Check if content requires premium access
  const requiresPayment = (requiredPlan) => {
    if (requiredPlan === 'STARTER') return false;
    return !hasAccess(requiredPlan);
  };

  // Set up global refreshSubscriptions function for use in other components
  useEffect(() => {
    // Make the refresh function globally available for payment completion
    window.refreshSubscriptions = async () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.id) {
          // Use the utility function to refresh and broadcast the update
          await forceRefreshSubscriptions(user.id);
        }
      }
    };

    return () => {
      // Clean up global function when component unmounts
      window.refreshSubscriptions = undefined;
    };
  }, []);

  const value = {
    subscriptions,
    userAccess,
    loading,
    hasAccess,
    hasPremiumAccess,
    getActiveSubscription,
    refreshSubscriptions,
    getHighestTierAccess,
    requiresPayment
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionContext;
