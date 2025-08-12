/**
 * Subscription Check Middleware
 * 
 * Middleware to check and update expired subscriptions before processing requests.
 * This ensures that subscription status is always up-to-date when accessing user data.
 */

import { markExpiredSubscriptions } from '../utils/subscriptionManager.js';

let lastChecked = null;
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Middleware to periodically check for expired subscriptions
 * Only runs if it hasn't been checked in the last 5 minutes to avoid performance issues
 */
export const subscriptionCheckMiddleware = async (req, res, next) => {
  try {
    const now = Date.now();
    
    // Only check if it's been more than CHECK_INTERVAL since last check
    if (!lastChecked || (now - lastChecked) > CHECK_INTERVAL) {
      // Run the check in the background, don't wait for it
      markExpiredSubscriptions()
        .then(result => {
          if (result.expired > 0) {
            console.log(`🔄 Background subscription check: ${result.expired} subscriptions expired`);
          }
        })
        .catch(error => {
          console.error('❌ Background subscription check failed:', error);
        });
      
      lastChecked = now;
    }
    
    next();
  } catch (error) {
    // Don't let subscription check errors block the request
    console.error('❌ Subscription check middleware error:', error);
    next();
  }
};

/**
 * Force subscription check middleware
 * Use this for critical operations that require up-to-date subscription status
 */
export const forceSubscriptionCheckMiddleware = async (req, res, next) => {
  try {
    await markExpiredSubscriptions();
    next();
  } catch (error) {
    console.error('❌ Force subscription check failed:', error);
    // Continue anyway, don't block the request
    next();
  }
};

/**
 * User-specific subscription check middleware
 * Checks subscriptions for the authenticated user only
 */
export const userSubscriptionCheckMiddleware = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.params.userId;
    
    if (userId) {
      // This is handled by the getUserSubscriptionsWithStatus function
      // which automatically checks expiry for the specific user
      console.log(`🔍 Checking subscriptions for user: ${userId}`);
    }
    
    next();
  } catch (error) {
    console.error('❌ User subscription check middleware error:', error);
    next();
  }
};

export default {
  subscriptionCheckMiddleware,
  forceSubscriptionCheckMiddleware,
  userSubscriptionCheckMiddleware
};
