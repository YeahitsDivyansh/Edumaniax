/**
 * Subscription Refresh Utilities
 * 
 * This utility provides methods to refresh subscription data across all components
 * after payment completion or subscription changes.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Refresh subscription data for a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} - The subscription data
 */
export const refreshUserSubscriptions = async (userId) => {
  if (!userId) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/payment/subscriptions/${userId}`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return data.subscriptions || [];
      }
    }
    
    throw new Error('Failed to fetch subscriptions');
  } catch (error) {
    console.error('Error refreshing subscriptions:', error);
    throw error;
  }
};

/**
 * Broadcast subscription update event to all listening components
 * @param {Array} subscriptions - The updated subscription data
 */
export const broadcastSubscriptionUpdate = (subscriptions) => {
  // Clear any cached subscription data
  localStorage.removeItem('userSubscriptions');
  localStorage.removeItem('userAccessControl');
  
  // Dispatch custom event to notify all components
  window.dispatchEvent(new CustomEvent('subscriptionUpdated', {
    detail: { subscriptions }
  }));
  
  console.log('Subscription update broadcasted to all components');
};

/**
 * Force refresh subscriptions for a user and broadcast the update
 * @param {string} userId - The user ID
 */
export const forceRefreshSubscriptions = async (userId) => {
  try {
    const subscriptions = await refreshUserSubscriptions(userId);
    broadcastSubscriptionUpdate(subscriptions);
    return subscriptions;
  } catch (error) {
    console.error('Error in force refresh subscriptions:', error);
    throw error;
  }
};

/**
 * Add event listener for subscription updates
 * @param {Function} callback - Callback function to handle subscription updates
 * @returns {Function} - Cleanup function to remove the event listener
 */
export const addSubscriptionUpdateListener = (callback) => {
  const handleUpdate = (event) => {
    callback(event.detail.subscriptions);
  };
  
  window.addEventListener('subscriptionUpdated', handleUpdate);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('subscriptionUpdated', handleUpdate);
  };
};

export default {
  refreshUserSubscriptions,
  broadcastSubscriptionUpdate,
  forceRefreshSubscriptions,
  addSubscriptionUpdateListener
};
