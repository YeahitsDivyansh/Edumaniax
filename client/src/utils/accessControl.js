/**
 * Client-Side Access Control Utilities for EduManiax Platform
 * 
 * This file provides utility functions to check access permissions
 * on the frontend and manage feature visibility.
 */

// Plan hierarchy for upgrade calculations
const PLAN_HIERARCHY = ['STARTER', 'SOLO', 'PRO', 'INSTITUTIONAL'];

// Feature categories for better organization
const FEATURE_CATEGORIES = {
  CORE: {
    name: 'Core Features',
    features: ['games', 'notes', 'basic_assessments']
  },
  PREMIUM: {
    name: 'Premium Features', 
    features: ['advanced_assessments', 'progress_tracking', 'certificates']
  },
  AI: {
    name: 'AI-Powered Features',
    features: ['ai_assessment', 'ai_personalization', 'ai_homework']
  },
  INSTITUTIONAL: {
    name: 'Institutional Features',
    features: ['bulk_management', 'custom_content', 'live_sessions']
  }
};

// Module configurations with access requirements
const MODULE_CONFIGS = {
  finance: {
    name: 'Finance Management',
    icon: '💰',
    minPlan: 'STARTER',
    levels: {
      1: { name: 'Budget Basics', minPlan: 'STARTER' },
      2: { name: 'Investment Fundamentals', minPlan: 'SOLO' },
      3: { name: 'Advanced Portfolio', minPlan: 'PRO' },
      4: { name: 'Finance Master', minPlan: 'PRO' }
    }
  },
  'digital-marketing': {
    name: 'Digital Marketing',
    icon: '📱',
    minPlan: 'STARTER',
    levels: {
      1: { name: 'Social Media Basics', minPlan: 'STARTER' },
      2: { name: 'Content Strategy', minPlan: 'SOLO' },
      3: { name: 'Analytics & ROI', minPlan: 'PRO' },
      4: { name: 'Marketing Guru', minPlan: 'PRO' }
    }
  },
  communication: {
    name: 'Communication Skills',
    icon: '🗣️',
    minPlan: 'STARTER',
    levels: {
      1: { name: 'Basic Speaking', minPlan: 'STARTER' },
      2: { name: 'Public Speaking', minPlan: 'SOLO' },
      3: { name: 'Leadership Communication', minPlan: 'PRO' },
      4: { name: 'Communication Expert', minPlan: 'PRO' }
    }
  },
  computers: {
    name: 'Computer Science',
    icon: '💻',
    minPlan: 'STARTER',
    levels: {
      1: { name: 'Programming Basics', minPlan: 'STARTER' },
      2: { name: 'Web Development', minPlan: 'SOLO' },
      3: { name: 'Advanced Algorithms', minPlan: 'PRO' },
      4: { name: 'Tech Wizard', minPlan: 'PRO' }
    }
  },
  entrepreneurship: {
    name: 'Entrepreneurship',
    icon: '🚀',
    minPlan: 'STARTER',
    levels: {
      1: { name: 'Innovation Explorer', minPlan: 'STARTER' },
      2: { name: 'Pitch Champion', minPlan: 'SOLO' },
      3: { name: 'MVP Strategist', minPlan: 'PRO' },
      4: { name: 'Business Tycoon', minPlan: 'PRO' }
    }
  },
  environment: {
    name: 'Environmental Science',
    icon: '🌱',
    minPlan: 'STARTER',
    levels: {
      1: { name: 'Eco Awareness', minPlan: 'STARTER' },
      2: { name: 'Sustainability Projects', minPlan: 'SOLO' },
      3: { name: 'Climate Solutions', minPlan: 'PRO' },
      4: { name: 'Environmental Guardian', minPlan: 'PRO' }
    }
  },
  law: {
    name: 'Legal Awareness',
    icon: '⚖️',
    minPlan: 'STARTER',
    levels: {
      1: { name: 'Basic Rights', minPlan: 'STARTER' },
      2: { name: 'Constitutional Law', minPlan: 'SOLO' },
      3: { name: 'Legal Practice', minPlan: 'PRO' },
      4: { name: 'The Law Challenger', minPlan: 'PRO' }
    }
  },
  leadership: {
    name: 'Leadership Skills',
    icon: '👑',
    minPlan: 'STARTER',
    levels: {
      1: { name: 'Team Basics', minPlan: 'STARTER' },
      2: { name: 'Management Skills', minPlan: 'SOLO' },
      3: { name: 'Strategic Leadership', minPlan: 'PRO' },
      4: { name: 'Visionary Leader', minPlan: 'PRO' }
    }
  },
  sel: {
    name: 'Social Emotional Learning',
    icon: '❤️',
    minPlan: 'STARTER',
    levels: {
      1: { name: 'Self Awareness', minPlan: 'STARTER' },
      2: { name: 'Social Skills', minPlan: 'SOLO' },
      3: { name: 'Emotional Intelligence', minPlan: 'PRO' },
      4: { name: 'Empathy Master', minPlan: 'PRO' }
    }
  }
};

/**
 * Access Control Class
 */
class AccessController {
  constructor(userSubscription = null, selectedModule = null) {
    this.userSubscription = userSubscription;
    this.selectedModule = selectedModule;
    this.currentPlan = this.getCurrentPlan();
    this.trialStartDate = this.getTrialStartDate();
  }

  /**
   * Get user's current highest plan
   */
  getCurrentPlan() {
    if (!this.userSubscription || !Array.isArray(this.userSubscription)) {
      return 'STARTER';
    }

    // Find the highest active subscription
    const activeSubscriptions = this.userSubscription.filter(sub => 
      sub.status === 'ACTIVE' && new Date(sub.endDate) > new Date()
    );

    if (activeSubscriptions.length === 0) {
      return 'STARTER';
    }

    // Return the highest tier among active subscriptions (don't mutate original array)
    for (const plan of [...PLAN_HIERARCHY].reverse()) {
      if (activeSubscriptions.some(sub => sub.planType === plan)) {
        return plan;
      }
    }

    return 'STARTER';
  }

  /**
   * Get trial start date for STARTER plan users
   */
  getTrialStartDate() {
    if (this.currentPlan !== 'STARTER') return null;
    
    // If user has subscriptions, check for any STARTER plan creation date
    if (this.userSubscription && Array.isArray(this.userSubscription)) {
      const starterSub = this.userSubscription.find(sub => sub.planType === 'STARTER');
      if (starterSub) {
        return new Date(starterSub.createdAt || starterSub.startDate);
      }
    }
    
    // Default to current date if no subscription found (new user)
    return new Date();
  }

  /**
   * Check if STARTER plan trial is still valid (within 7 days)
   */
  isTrialValid() {
    if (this.currentPlan !== 'STARTER') return true; // Non-starter plans don't have trial limits
    
    if (!this.trialStartDate) return true; // If no start date, allow trial
    
    const currentDate = new Date();
    const daysDifference = Math.floor((currentDate - this.trialStartDate) / (1000 * 60 * 60 * 24));
    
    return daysDifference <= 7;
  }

  /**
   * Get remaining trial days for STARTER plan
   */
  getRemainingTrialDays() {
    if (this.currentPlan !== 'STARTER') return null;
    
    if (!this.trialStartDate) return 7;
    
    const currentDate = new Date();
    const daysDifference = Math.floor((currentDate - this.trialStartDate) / (1000 * 60 * 60 * 24));
    
    return Math.max(0, 7 - daysDifference);
  }

  /**
   * Check if user has access to a specific module
   */
  hasModuleAccess(moduleKey) {
    const module = MODULE_CONFIGS[moduleKey];
    if (!module) return false;

    const currentPlanIndex = PLAN_HIERARCHY.indexOf(this.currentPlan);
    const requiredPlanIndex = PLAN_HIERARCHY.indexOf(module.minPlan);

    // STARTER plan users can see all modules during trial period
    if (this.currentPlan === 'STARTER') {
      return this.isTrialValid();
    }

    // For SOLO plans, check if it's their selected module
    if (this.currentPlan === 'SOLO') {
      return this.selectedModule === moduleKey && currentPlanIndex >= requiredPlanIndex;
    }

    // PRO and INSTITUTIONAL have access to all modules
    return currentPlanIndex >= requiredPlanIndex;
  }

  /**
   * Check if user has access to a specific level within a module
   */
  hasLevelAccess(moduleKey, levelNumber) {
    if (!this.hasModuleAccess(moduleKey)) return false;

    const module = MODULE_CONFIGS[moduleKey];
    const level = module?.levels?.[levelNumber];
    
    // PRO and INSTITUTIONAL plans have access to ALL levels of ALL modules
    // (even if the level is not explicitly defined in MODULE_CONFIGS)
    if (this.currentPlan === 'PRO' || this.currentPlan === 'INSTITUTIONAL') {
      return true;
    }
    
    // SOLO plan users have access to ALL levels of their selected module
    // (even if the level is not explicitly defined in MODULE_CONFIGS)
    if (this.currentPlan === 'SOLO') {
      return this.selectedModule === moduleKey;
    }
    
    // For other plans, the level must exist in MODULE_CONFIGS
    if (!level) return false;

    // STARTER plan users can only access level 1 during trial period
    if (this.currentPlan === 'STARTER') {
      // Note: Individual challenges will be handled by useGameAccess hook
      // This allows the level to appear unlocked in UI but restricts actual game access
      return levelNumber === 1 && this.isTrialValid();
    }

    // For any other plans, check individual level requirements
    const currentPlanIndex = PLAN_HIERARCHY.indexOf(this.currentPlan);
    const requiredPlanIndex = PLAN_HIERARCHY.indexOf(level.minPlan);
    return currentPlanIndex >= requiredPlanIndex;
  }

  /**
   * Check if user has access to games for a specific module
   */
  hasGameAccess(moduleKey) {
    // STARTER plan users can access games for all modules (level 1 only) during trial
    if (this.currentPlan === 'STARTER') {
      return this.hasModuleAccess(moduleKey) && this.isTrialValid();
    }

    // Other plans follow normal module access rules
    return this.hasModuleAccess(moduleKey);
  }

  /**
   * Check if user has access to games at a specific level
   */
  hasGameLevelAccess(moduleKey, levelNumber) {
    if (!this.hasGameAccess(moduleKey)) return false;
    
    // Note: For STARTER plan, we're allowing level 1 access here
    // but the individual challenge access is restricted in useGameAccess hook
    return this.hasLevelAccess(moduleKey, levelNumber);
  }

  /**
   * Check if user has access to specific features
   */
  hasFeatureAccess(feature) {
    const featureRequirements = {
      games: 'STARTER',
      notes: 'STARTER',
      basic_assessments: 'STARTER',
      advanced_assessments: 'SOLO',
      progress_tracking: 'SOLO',
      certificates: 'SOLO', // Now available from SOLO plan
      ai_assessment: 'PRO',
      ai_personalization: 'PRO',
      ai_homework: 'PRO',
      live_sessions: 'INSTITUTIONAL',
      bulk_management: 'INSTITUTIONAL',
      custom_content: 'INSTITUTIONAL',
      priority_support: 'INSTITUTIONAL'
    };

    const requiredPlan = featureRequirements[feature];
    if (!requiredPlan) return false;

    const currentPlanIndex = PLAN_HIERARCHY.indexOf(this.currentPlan);
    const requiredPlanIndex = PLAN_HIERARCHY.indexOf(requiredPlan);

    return currentPlanIndex >= requiredPlanIndex;
  }

  /**
   * Get accessible modules for current user
   */
  getAccessibleModules() {
    return Object.entries(MODULE_CONFIGS).filter(([key]) => 
      this.hasModuleAccess(key)
    ).map(([key, config]) => ({
      key,
      ...config,
      hasAccess: true
    }));
  }

  /**
   * Get locked modules (require upgrade)
   */
  getLockedModules() {
    return Object.entries(MODULE_CONFIGS).filter(([key]) => 
      !this.hasModuleAccess(key)
    ).map(([key, config]) => ({
      key,
      ...config,
      hasAccess: false,
      requiredPlan: config.minPlan
    }));
  }

  /**
   * Get accessible levels within a module
   */
  getAccessibleLevels(moduleKey) {
    const module = MODULE_CONFIGS[moduleKey];
    if (!module || !this.hasModuleAccess(moduleKey)) return [];

    return Object.entries(module.levels).filter(([levelNum]) => 
      this.hasLevelAccess(moduleKey, parseInt(levelNum))
    ).map(([levelNum, levelConfig]) => ({
      number: parseInt(levelNum),
      ...levelConfig,
      hasAccess: true
    }));
  }

  /**
   * Get locked levels within a module
   */
  getLockedLevels(moduleKey) {
    const module = MODULE_CONFIGS[moduleKey];
    if (!module) return [];

    return Object.entries(module.levels).filter(([levelNum]) => 
      !this.hasLevelAccess(moduleKey, parseInt(levelNum))
    ).map(([levelNum, levelConfig]) => ({
      number: parseInt(levelNum),
      ...levelConfig,
      hasAccess: false,
      requiredPlan: levelConfig.minPlan
    }));
  }

  /**
   * Get upgrade suggestions
   */
  getUpgradeSuggestions(targetModule = null, targetLevel = null) {
    let requiredPlan = this.currentPlan;

    if (targetModule) {
      const module = MODULE_CONFIGS[targetModule];
      if (module && !this.hasModuleAccess(targetModule)) {
        requiredPlan = module.minPlan;
      }

      // For level-specific checks, consider SOLO and PRO plan special cases
      if (targetLevel && module?.levels?.[targetLevel]) {
        // SOLO users have access to all levels of their selected module
        if (this.currentPlan === 'SOLO' && this.selectedModule === targetModule) {
          // No upgrade needed for SOLO users accessing their selected module
          return null;
        }
        
        // PRO and INSTITUTIONAL users have access to all levels of all modules
        if (this.currentPlan === 'PRO' || this.currentPlan === 'INSTITUTIONAL') {
          // No upgrade needed for PRO/INSTITUTIONAL users
          return null;
        }
        
        const levelRequiredPlan = module.levels[targetLevel].minPlan;
        const currentIndex = PLAN_HIERARCHY.indexOf(requiredPlan);
        const levelIndex = PLAN_HIERARCHY.indexOf(levelRequiredPlan);
        
        if (levelIndex > currentIndex) {
          requiredPlan = levelRequiredPlan;
        }
      }
    }

    const currentIndex = PLAN_HIERARCHY.indexOf(this.currentPlan);
    const requiredIndex = PLAN_HIERARCHY.indexOf(requiredPlan);

    if (currentIndex >= requiredIndex) {
      return null; // No upgrade needed
    }

    return {
      currentPlan: this.currentPlan,
      recommendedPlan: requiredPlan,
      benefits: this.getPlanBenefits(requiredPlan),
      unlockedModules: this.getUnlockedModulesForPlan(requiredPlan),
      unlockedFeatures: this.getUnlockedFeaturesForPlan(requiredPlan)
    };
  }

  /**
   * Get plan benefits
   */
  getPlanBenefits(planType) {
    const benefits = {
      STARTER: [
        'Access to ALL modules for 7 days',
        'Level 1 games for each module',
        'Basic notes and content',
        'Community access'
      ],
      SOLO: [
        'Full access to 1 premium module',
        'All levels and activities',
        'Completion certificates',
        'Progress tracking',
        'Downloadable content'
      ],
      PRO: [
        'Access to all modules',
        'AI-powered assessments',
        'Completion certificates for all modules',
        'Advanced analytics',
        'Priority support',
        '6 months access'
      ],
      INSTITUTIONAL: [
        'Everything in PRO',
        'Bulk user management',
        'Live expert sessions',
        'Custom content creation',
        'Dedicated support'
      ]
    };

    return benefits[planType] || [];
  }

  /**
   * Get modules that would be unlocked with a specific plan
   */
  getUnlockedModulesForPlan(planType) {
    const planIndex = PLAN_HIERARCHY.indexOf(planType);
    
    return Object.entries(MODULE_CONFIGS).filter(([, config]) => {
      const requiredIndex = PLAN_HIERARCHY.indexOf(config.minPlan);
      return requiredIndex <= planIndex;
    }).map(([key, config]) => ({
      key,
      name: config.name,
      icon: config.icon
    }));
  }

  /**
   * Get features that would be unlocked with a specific plan
   */
  getUnlockedFeaturesForPlan() {
    const features = [];
    
    Object.entries(FEATURE_CATEGORIES).forEach(([, categoryInfo]) => {
      categoryInfo.features.forEach(feature => {
        if (this.hasFeatureAccess(feature)) {
          features.push({
            name: feature,
            category: categoryInfo.name
          });
        }
      });
    });

    return features;
  }

  /**
   * Check if content should show upgrade prompt
   */
  shouldShowUpgradePrompt(moduleKey, levelNumber = null) {
    if (!moduleKey) return false;

    if (!this.hasModuleAccess(moduleKey)) return true;
    
    if (levelNumber && !this.hasLevelAccess(moduleKey, levelNumber)) return true;

    return false;
  }

  /**
   * Generate access status object for UI components
   */
  getAccessStatus(moduleKey, levelNumber = null) {
    const hasModuleAccess = this.hasModuleAccess(moduleKey);
    const hasLevelAccess = levelNumber ? this.hasLevelAccess(moduleKey, levelNumber) : true;
    
    return {
      hasAccess: hasModuleAccess && hasLevelAccess,
      needsUpgrade: !hasModuleAccess || !hasLevelAccess,
      currentPlan: this.currentPlan,
      requiredPlan: this.getRequiredPlan(moduleKey, levelNumber),
      upgradeInfo: this.getUpgradeSuggestions(moduleKey, levelNumber)
    };
  }

  /**
   * Get minimum required plan for access
   */
  getRequiredPlan(moduleKey, levelNumber = null) {
    const module = MODULE_CONFIGS[moduleKey];
    if (!module) return 'PRO';

    // For SOLO users accessing their selected module, SOLO plan is sufficient for all levels
    if (levelNumber && this.currentPlan === 'SOLO' && this.selectedModule === moduleKey) {
      return 'SOLO';
    }

    // For PRO/INSTITUTIONAL users, their current plan is always sufficient for any level
    if (levelNumber && (this.currentPlan === 'PRO' || this.currentPlan === 'INSTITUTIONAL')) {
      return this.currentPlan;
    }

    if (levelNumber && module.levels?.[levelNumber]) {
      return module.levels[levelNumber].minPlan;
    }

    return module.minPlan;
  }
}

/**
 * Hook for React components to use access control
 */
export const useAccessControl = (userSubscription = null, selectedModule = null) => {
  const accessController = new AccessController(userSubscription, selectedModule);

  return {
    currentPlan: accessController.currentPlan,
    isTrialValid: () => accessController.isTrialValid(),
    getRemainingTrialDays: () => accessController.getRemainingTrialDays(),
    hasModuleAccess: (moduleKey) => accessController.hasModuleAccess(moduleKey),
    hasLevelAccess: (moduleKey, levelNumber) => accessController.hasLevelAccess(moduleKey, levelNumber),
    hasGameAccess: (moduleKey) => accessController.hasGameAccess(moduleKey),
    hasGameLevelAccess: (moduleKey, levelNumber) => accessController.hasGameLevelAccess(moduleKey, levelNumber),
    hasFeatureAccess: (feature) => accessController.hasFeatureAccess(feature),
    getAccessibleModules: () => accessController.getAccessibleModules(),
    getLockedModules: () => accessController.getLockedModules(),
    getAccessibleLevels: (moduleKey) => accessController.getAccessibleLevels(moduleKey),
    getLockedLevels: (moduleKey) => accessController.getLockedLevels(moduleKey),
    getUpgradeSuggestions: (moduleKey, levelNumber) => accessController.getUpgradeSuggestions(moduleKey, levelNumber),
    shouldShowUpgradePrompt: (moduleKey, levelNumber) => accessController.shouldShowUpgradePrompt(moduleKey, levelNumber),
    getAccessStatus: (moduleKey, levelNumber) => accessController.getAccessStatus(moduleKey, levelNumber),
    getPlanBenefits: (planType) => accessController.getPlanBenefits(planType)
  };
};

// Export configurations and utilities
export {
  MODULE_CONFIGS,
  FEATURE_CATEGORIES,
  PLAN_HIERARCHY,
  AccessController
};
