// pricingUtils.js - Utility functions for pricing and subscription management

/**
 * Check if a plan is the user's current plan
 */
export const isCurrentPlan = (accessControl, planTitle, user) => {
  if (!user || !accessControl.currentPlan) return false;
  
  const planType = planTitle.replace(' PLAN', '');
  return accessControl.currentPlan === planType;
};

/**
 * Check if a plan should be grayed out (already purchased or lower tier)
 */
export const shouldGrayOut = (accessControl, planTitle, user) => {
  if (!user || !accessControl.currentPlan) return false;
  
  const targetPlanType = planTitle.replace(' PLAN', '');
  
  // Define plan hierarchy
  const planHierarchy = ['STARTER', 'SOLO', 'PRO', 'INSTITUTIONAL'];
  const currentIndex = planHierarchy.indexOf(accessControl.currentPlan);
  const targetIndex = planHierarchy.indexOf(targetPlanType);
  
  // Gray out current plan and all lower tier plans, but with special case for SOLO
  if (targetPlanType === 'SOLO' && accessControl.currentPlan === 'SOLO') {
    // For SOLO plans, only gray out if all modules are purchased
    const availableModules = accessControl.getAvailableForPurchase();
    return availableModules.length === 0;
  }
  
  return targetIndex <= currentIndex;
};

/**
 * Get button text based on plan status
 */
export const getButtonText = (accessControl, plan, user) => {
  const planType = plan.title.replace(' PLAN', '');
  
  if (plan.title === "STARTER PLAN") return "Free Forever";
  
  // Special handling for SOLO plan
  if (planType === 'SOLO' && accessControl.currentPlan === 'SOLO') {
    const availableModules = accessControl.getAvailableForPurchase();
    if (availableModules.length === 0) {
      return "All Modules Owned";
    }
    return "Add Module";
  }
  
  if (isCurrentPlan(accessControl, plan.title, user)) return "Current Plan";
  if (shouldGrayOut(accessControl, plan.title, user)) return "Already Owned";
  return plan.button;
};

/**
 * Check if button should be disabled
 */
export const isButtonDisabled = (accessControl, plan, user) => {
  const planType = plan.title.replace(' PLAN', '');
  
  if (plan.title === "STARTER PLAN") return true;
  
  // Special handling for SOLO plan
  if (planType === 'SOLO' && accessControl.currentPlan === 'SOLO') {
    const availableModules = accessControl.getAvailableForPurchase();
    return availableModules.length === 0;
  }
  
  return shouldGrayOut(accessControl, plan.title, user);
};

/**
 * Get upgrade suggestion for current plan users
 */
export const getUpgradeSuggestion = (accessControl, plan, user) => {
  const planType = plan.title.replace(' PLAN', '');
  
  if (!user) return null;
  
  if (plan.title === "STARTER PLAN" && accessControl.currentPlan === 'STARTER') {
    return "Try a SOLO plan for access to premium modules!";
  }
  
  if (planType === "SOLO") {
    if (accessControl.currentPlan === 'SOLO') {
      const availableModules = accessControl.getAvailableForPurchase();
      const purchasedModules = accessControl.getPurchasedModules();
      
      if (availableModules.length === 0) {
        return "You own all modules! Upgrade to PRO for AI features.";
      } else if (purchasedModules.length > 0) {
        return `You own ${purchasedModules.length} module(s). Add more or upgrade to PRO.`;
      }
    }
  }
  
  if (plan.title === "PRO PLAN" && accessControl.currentPlan === 'PRO') {
    return "Consider INSTITUTIONAL plan for your school or organization.";
  }
  
  return null;
};

/**
 * Handle plan selection click
 */
export const handlePlanClick = (accessControl, plan, user, navigate) => {
  if (isButtonDisabled(accessControl, plan, user)) return;
  
  const planType = plan.title.replace(' PLAN', '');
  
  // Special handling for SOLO plan when user already has SOLO
  if (planType === 'SOLO' && accessControl.currentPlan === 'SOLO') {
    navigate('/payment?plan=SOLO&mode=module');
    return;
  }
  
  // Regular navigation for other cases
  navigate(`/payment?plan=${planType}`);
};
