/**
 * Access Control Routes for EduManiax Platform
 * 
 * This file defines API endpoints for checking access permissions,
 * getting subscription details, and managing feature access.
 */

import express from 'express';
import { PrismaClient } from '@prisma/client';
import {
  requireAuth,
  getAccessSummaryHandler,
  attachSubscriptionInfo
} from '../middlewares/accessMiddleware.js';
import {
  hasModuleAccess,
  hasFeatureAccess,
  getPlanDetails,
  getUpgradeInfo,
  MODULES,
  FEATURES
} from '../utils/accessControl.js';

const router = express.Router();
const prisma = new PrismaClient();

// Apply authentication middleware to all routes
router.use(requireAuth);
router.use(attachSubscriptionInfo);

/**
 * GET /access/summary/:userId
 * Get complete access summary for a user
 */
router.get('/summary/:userId', getAccessSummaryHandler);

/**
 * GET /access/check-module/:userId/:moduleKey
 * Check if user has access to a specific module
 */
router.get('/check-module/:userId/:moduleKey', async (req, res) => {
  try {
    const { userId, moduleKey } = req.params;
    const { highestPlan, selectedModule } = req.userSubscription;

    const hasAccess = hasModuleAccess(highestPlan, moduleKey, selectedModule);
    
    if (!hasAccess) {
      const upgradeInfo = getUpgradeInfo(highestPlan, 'SOLO');
      return res.json({
        hasAccess: false,
        currentPlan: highestPlan,
        requiredModule: moduleKey,
        selectedModule,
        upgradeInfo,
        message: `Access to ${moduleKey} module requires subscription upgrade`,
        redirectUrl: `/payment-required?plan=SOLO&module=${moduleKey}`
      });
    }

    res.json({
      hasAccess: true,
      currentPlan: highestPlan,
      moduleKey,
      selectedModule,
      message: 'Access granted'
    });

  } catch (error) {
    console.error('Error checking module access:', error);
    res.status(500).json({
      error: 'Failed to check module access',
      message: 'An error occurred while checking access permissions'
    });
  }
});

/**
 * GET /access/check-feature/:userId/:feature
 * Check if user has access to a specific feature
 */
router.get('/check-feature/:userId/:feature', async (req, res) => {
  try {
    const { userId, feature } = req.params;
    const { highestPlan } = req.userSubscription;

    const hasAccess = hasFeatureAccess(highestPlan, feature);
    
    if (!hasAccess) {
      const upgradeInfo = getUpgradeInfo(highestPlan, 'PRO');
      return res.json({
        hasAccess: false,
        currentPlan: highestPlan,
        requiredFeature: feature,
        upgradeInfo,
        message: `Access to ${feature} feature requires subscription upgrade`,
        redirectUrl: `/payment-required?plan=PRO&feature=${feature}`
      });
    }

    res.json({
      hasAccess: true,
      currentPlan: highestPlan,
      feature,
      message: 'Feature access granted'
    });

  } catch (error) {
    console.error('Error checking feature access:', error);
    res.status(500).json({
      error: 'Failed to check feature access',
      message: 'An error occurred while checking feature permissions'
    });
  }
});

/**
 * GET /access/modules/:userId
 * Get all modules with access status for user
 */
router.get('/modules/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { highestPlan, selectedModule } = req.userSubscription;

    const moduleStatus = Object.entries(MODULES).map(([key, moduleKey]) => {
      const hasAccess = hasModuleAccess(highestPlan, moduleKey, selectedModule);
      
      return {
        key,
        moduleKey,
        name: moduleKey.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        hasAccess,
        isSelected: selectedModule === moduleKey,
        requiredPlan: hasAccess ? null : 'SOLO',
        upgradeInfo: hasAccess ? null : getUpgradeInfo(highestPlan, 'SOLO')
      };
    });

    res.json({
      userId,
      currentPlan: highestPlan,
      selectedModule,
      modules: moduleStatus,
      accessibleCount: moduleStatus.filter(m => m.hasAccess).length,
      totalCount: moduleStatus.length
    });

  } catch (error) {
    console.error('Error getting module access status:', error);
    res.status(500).json({
      error: 'Failed to get module access status',
      message: 'An error occurred while retrieving module information'
    });
  }
});

/**
 * GET /access/features/:userId
 * Get all features with access status for user
 */
router.get('/features/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { highestPlan } = req.userSubscription;

    const featureStatus = Object.entries(FEATURES).map(([key, feature]) => {
      const hasAccess = hasFeatureAccess(highestPlan, feature);
      
      return {
        key,
        feature,
        name: feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        hasAccess,
        requiredPlan: hasAccess ? null : 'PRO',
        upgradeInfo: hasAccess ? null : getUpgradeInfo(highestPlan, 'PRO')
      };
    });

    res.json({
      userId,
      currentPlan: highestPlan,
      features: featureStatus,
      accessibleCount: featureStatus.filter(f => f.hasAccess).length,
      totalCount: featureStatus.length
    });

  } catch (error) {
    console.error('Error getting feature access status:', error);
    res.status(500).json({
      error: 'Failed to get feature access status',
      message: 'An error occurred while retrieving feature information'
    });
  }
});

/**
 * GET /access/plan-details/:planType
 * Get detailed information about a specific plan
 */
router.get('/plan-details/:planType', async (req, res) => {
  try {
    const { planType } = req.params;
    const planDetails = getPlanDetails(planType);

    if (!planDetails) {
      return res.status(404).json({
        error: 'Plan not found',
        message: `Plan type '${planType}' is not valid`
      });
    }

    res.json({
      planType,
      ...planDetails,
      accessibleModules: planDetails.modules.length,
      accessibleFeatures: planDetails.features.length
    });

  } catch (error) {
    console.error('Error getting plan details:', error);
    res.status(500).json({
      error: 'Failed to get plan details',
      message: 'An error occurred while retrieving plan information'
    });
  }
});

/**
 * GET /access/upgrade-options/:userId
 * Get upgrade options and benefits for user
 */
router.get('/upgrade-options/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { highestPlan } = req.userSubscription;
    const { targetModule, targetFeature } = req.query;

    const planHierarchy = ['STARTER', 'SOLO', 'PRO', 'INSTITUTIONAL'];
    const currentIndex = planHierarchy.indexOf(highestPlan);
    
    const upgradeOptions = planHierarchy.slice(currentIndex + 1).map(plan => {
      const planDetails = getPlanDetails(plan);
      const upgradeInfo = getUpgradeInfo(highestPlan, plan);
      
      return {
        planType: plan,
        ...planDetails,
        upgradeInfo,
        monthlyPrice: planDetails.cost / 3, // Assuming 3-month plans
        savings: plan === 'PRO' ? '20% savings vs SOLO' : null
      };
    });

    // If targeting specific module/feature, highlight relevant upgrade
    let recommendedPlan = null;
    if (targetModule && !hasModuleAccess(highestPlan, targetModule)) {
      recommendedPlan = 'SOLO';
    } else if (targetFeature && !hasFeatureAccess(highestPlan, targetFeature)) {
      recommendedPlan = 'PRO';
    }

    res.json({
      userId,
      currentPlan: highestPlan,
      upgradeOptions,
      recommendedPlan,
      targetModule,
      targetFeature,
      hasUpgradeOptions: upgradeOptions.length > 0
    });

  } catch (error) {
    console.error('Error getting upgrade options:', error);
    res.status(500).json({
      error: 'Failed to get upgrade options',
      message: 'An error occurred while retrieving upgrade information'
    });
  }
});

/**
 * POST /access/update-selected-module/:userId
 * Update user's selected module (for STARTER/SOLO plans)
 */
router.post('/update-selected-module/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { moduleKey } = req.body;
    const { highestPlan } = req.userSubscription;

    // Validate module key
    if (!Object.values(MODULES).includes(moduleKey)) {
      return res.status(400).json({
        error: 'Invalid module',
        message: `Module '${moduleKey}' is not valid`
      });
    }

    // Check if user can select modules (only STARTER and SOLO)
    if (!['STARTER', 'SOLO'].includes(highestPlan)) {
      return res.status(400).json({
        error: 'Module selection not applicable',
        message: 'PRO and INSTITUTIONAL users have access to all modules'
      });
    }

    // Update user's selected module
    await prisma.user.update({
      where: { id: userId },
      data: { selectedModule: moduleKey }
    });

    res.json({
      success: true,
      userId,
      selectedModule: moduleKey,
      currentPlan: highestPlan,
      message: `Selected module updated to ${moduleKey}`
    });

  } catch (error) {
    console.error('Error updating selected module:', error);
    res.status(500).json({
      error: 'Failed to update selected module',
      message: 'An error occurred while updating module selection'
    });
  }
});

/**
 * GET /access/activity-limits/:userId/:moduleKey
 * Get activity limits for user in a specific module
 */
router.get('/activity-limits/:userId/:moduleKey', async (req, res) => {
  try {
    const { userId, moduleKey } = req.params;
    const { highestPlan, selectedModule } = req.userSubscription;

    // Check module access first
    if (!hasModuleAccess(highestPlan, moduleKey, selectedModule)) {
      return res.status(403).json({
        error: 'Module access denied',
        message: `Access to ${moduleKey} module is not available in your current plan`
      });
    }

    // Define limits based on plan
    const limits = {
      STARTER: {
        maxActivities: 3,
        maxLevels: 1,
        canDownload: false,
        hasAI: false,
        hasCertificates: false
      },
      SOLO: {
        maxActivities: 'unlimited',
        maxLevels: 3,
        canDownload: true,
        hasAI: false,
        hasCertificates: false
      },
      PRO: {
        maxActivities: 'unlimited',
        maxLevels: 'unlimited',
        canDownload: true,
        hasAI: true,
        hasCertificates: true
      },
      INSTITUTIONAL: {
        maxActivities: 'unlimited',
        maxLevels: 'unlimited',
        canDownload: true,
        hasAI: true,
        hasCertificates: true,
        hasCustomContent: true
      }
    };

    const userLimits = limits[highestPlan] || limits.STARTER;

    res.json({
      userId,
      moduleKey,
      currentPlan: highestPlan,
      limits: userLimits,
      hasModuleAccess: true
    });

  } catch (error) {
    console.error('Error getting activity limits:', error);
    res.status(500).json({
      error: 'Failed to get activity limits',
      message: 'An error occurred while retrieving activity limits'
    });
  }
});

export default router;
