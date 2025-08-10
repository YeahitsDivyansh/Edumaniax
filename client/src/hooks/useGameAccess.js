/**
 * Common Game Access Control Hook
 * 
 * This hook provides unified access control logic for all game modules.
 * It handles subscription fetching, module mapping, and challenge unlocking.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAccessControl } from '../utils/accessControl';

// Module mapping for all courses
const MODULE_MAPPING = {
  'Leadership': 'leadership',
  'Entrepreneurship': 'entrepreneurship', 
  'Finance': 'finance',
  'Digital Marketing': 'digital-marketing',
  'Communication': 'communication',
  'Computer Science': 'computers',
  'Environmental Science': 'environment',
  'Legal Awareness': 'law',
  'Social Emotional Learning': 'sel'
};

/**
 * Custom hook for game access control
 * @param {string} moduleKey - The module key (e.g., 'leadership', 'entrepreneurship')
 * @param {Array} progress - Progress array from module context
 * @returns {Object} Access control utilities and state
 */
export const useGameAccess = (moduleKey, progress = []) => {
  const { user, role } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Access control hook
  const { hasLevelAccess, currentPlan, isTrialValid, getRemainingTrialDays } = useAccessControl(subscriptions, selectedModule);

  // Fetch user subscription data
  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/payment/subscriptions/${user.id}`
        );
        
        if (response.ok) {
          const subscriptionData = await response.json();
          setSubscriptions(Array.isArray(subscriptionData) ? subscriptionData : []);
          
          // Set selected module from active subscription
          const activeSubscription = Array.isArray(subscriptionData) 
            ? subscriptionData.find(sub => sub.status === 'ACTIVE') 
            : null;
          
          if (activeSubscription && activeSubscription.notes) {
            try {
              const parsedNotes = JSON.parse(activeSubscription.notes);
              const rawModule = parsedNotes.selectedModule;
              
              setSelectedModule(MODULE_MAPPING[rawModule] || rawModule?.toLowerCase());
            } catch {
              setSelectedModule(activeSubscription.notes?.toLowerCase());
            }
          }
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        setSubscriptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSubscriptions();
  }, [user?.id]);

  // Helper function to check if a challenge is completed
  const isChallengeCompleted = (moduleIndex, challengeIndex) => {
    return progress.some(
      (p) =>
        p.moduleIndex === moduleIndex &&
        p.challengeIndex === challengeIndex &&
        p.completed
    );
  };

  // Main challenge unlock logic
  const isChallengeUnlocked = (moduleIndex, challengeIndex, modules = []) => {
    // Admin always has access
    if (role === "admin") return true;

    // Use access control system for subscription-based access
    const levelNumber = moduleIndex + 1; // Convert 0-based index to 1-based level
    const hasSubscriptionAccess = hasLevelAccess(moduleKey, levelNumber);
    
    // If user has subscription access to this level, unlock all challenges in that level
    if (hasSubscriptionAccess) return true;

    // Fallback to progress-based unlocking for users without subscription
    if (moduleIndex === 0 && challengeIndex === 0) return true;

    if (challengeIndex > 0) {
      return isChallengeCompleted(moduleIndex, challengeIndex - 1);
    }

    const prevModule = modules[moduleIndex - 1];
    if (!prevModule) return false;

    const lastChallengeIndex = prevModule.challenges.length - 1;
    return isChallengeCompleted(moduleIndex - 1, lastChallengeIndex);
  };

  // Get access info for debugging
  const getAccessInfo = (levelNumber) => {
    return {
      currentPlan,
      hasAccess: hasLevelAccess(moduleKey, levelNumber),
      selectedModule,
      isTrialValid: currentPlan === 'STARTER' ? isTrialValid() : null,
      remainingDays: currentPlan === 'STARTER' ? getRemainingTrialDays() : null
    };
  };

  // Get button config for challenge
  const getChallengeButtonConfig = (isUnlocked, challenge, navigate) => {
    if (isUnlocked || role === "admin") {
      return {
        type: 'start',
        className: 'bg-[#10903E] text-white hover:bg-[#0a7d35] hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-transform duration-200',
        icon: '/imageForDesign/start.svg',
        text: 'Start Now',
        onClick: () => {
          if (role === "admin") navigate(challenge.path);
          else if (!user) navigate("/login");
          else navigate(challenge.path);
        }
      };
    } else {
      return {
        type: 'unlock',
        className: 'bg-[#BB8B00] text-white hover:bg-[#996600]',
        icon: '/imageForDesign/unlock.svg',
        text: 'Unlock Now',
        onClick: () => navigate("/pricing")
      };
    }
  };

  return {
    // State
    subscriptions,
    selectedModule,
    currentPlan,
    isLoading,
    
    // Access control functions
    isChallengeCompleted,
    isChallengeUnlocked,
    hasLevelAccess: (levelNumber) => hasLevelAccess(moduleKey, levelNumber),
    getAccessInfo,
    getChallengeButtonConfig,
    
    // Trial info (for STARTER plan)
    isTrialValid: currentPlan === 'STARTER' ? isTrialValid() : true,
    remainingTrialDays: currentPlan === 'STARTER' ? getRemainingTrialDays() : null
  };
};

export default useGameAccess;
