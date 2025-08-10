/**
 * Example Component: Module Dashboard with Access Control
 * 
 * This component demonstrates how to implement access control
 * for different modules and features in the EduManiax platform.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAccessControl } from '../utils/accessControl';
import ProtectedRoute from '../components/ProtectedRoute';
import { 
  Lock, 
  CheckCircle, 
  Crown, 
  Zap, 
  Star,
  BookOpen,
  Brain,
  Award,
  Users,
  ArrowRight
} from 'lucide-react';

const ModuleDashboard = () => {
  const navigate = useNavigate();
  const { subscriptions, loading } = useSubscription();
  const [selectedModule, setSelectedModule] = useState(
    localStorage.getItem('selectedModule') || null
  );
  
  const accessControl = useAccessControl(subscriptions, selectedModule);

  // Module configurations with icons and descriptions
  const moduleConfigs = {
    'finance': {
      name: 'Finance Management',
      icon: '💰',
      color: 'bg-green-100 border-green-400 text-green-800',
      description: 'Learn budgeting, investing, and financial planning',
      levels: 3
    },
    'digital-marketing': {
      name: 'Digital Marketing',
      icon: '📱',
      color: 'bg-blue-100 border-blue-400 text-blue-800',
      description: 'Master social media, content creation, and analytics',
      levels: 3
    },
    'communication': {
      name: 'Communication Skills',
      icon: '🗣️',
      color: 'bg-purple-100 border-purple-400 text-purple-800',
      description: 'Develop speaking, writing, and presentation skills',
      levels: 3
    },
    'computers': {
      name: 'Computer Science',
      icon: '💻',
      color: 'bg-indigo-100 border-indigo-400 text-indigo-800',
      description: 'Programming, web development, and algorithms',
      levels: 3
    },
    'entrepreneurship': {
      name: 'Entrepreneurship',
      icon: '🚀',
      color: 'bg-orange-100 border-orange-400 text-orange-800',
      description: 'Business ideas, startups, and innovation',
      levels: 3
    },
    'environment': {
      name: 'Environmental Science',
      icon: '🌱',
      color: 'bg-emerald-100 border-emerald-400 text-emerald-800',
      description: 'Sustainability, climate change, and eco-solutions',
      levels: 3
    },
    'law': {
      name: 'Legal Awareness',
      icon: '⚖️',
      color: 'bg-gray-100 border-gray-400 text-gray-800',
      description: 'Constitutional rights, legal procedures, and ethics',
      levels: 3
    },
    'leadership': {
      name: 'Leadership Skills',
      icon: '👑',
      color: 'bg-yellow-100 border-yellow-400 text-yellow-800',
      description: 'Team management, decision making, and influence',
      levels: 3
    },
    'sel': {
      name: 'Social Emotional Learning',
      icon: '❤️',
      color: 'bg-pink-100 border-pink-400 text-pink-800',
      description: 'Self-awareness, empathy, and emotional intelligence',
      levels: 3
    }
  };

  // Get accessible and locked modules
  const accessibleModules = accessControl.getAccessibleModules();
  const lockedModules = accessControl.getLockedModules();

  const handleModuleSelect = (moduleKey) => {
    if (accessControl.currentPlan === 'STARTER' || accessControl.currentPlan === 'SOLO') {
      setSelectedModule(moduleKey);
      localStorage.setItem('selectedModule', moduleKey);
      // You might want to call an API to update this in the database
    }
    navigate(`/modules/${moduleKey}`);
  };

  const handleUpgrade = (targetPlan = 'PRO') => {
    navigate(`/payment?plan=${targetPlan}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Learning Dashboard
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              {accessControl.currentPlan === 'STARTER' && <Star className="w-5 h-5 text-yellow-500" />}
              {accessControl.currentPlan === 'SOLO' && <Zap className="w-5 h-5 text-blue-500" />}
              {accessControl.currentPlan === 'PRO' && <Crown className="w-5 h-5 text-purple-500" />}
              {accessControl.currentPlan === 'INSTITUTIONAL' && <Crown className="w-5 h-5 text-gold-500" />}
              <span className="font-semibold text-gray-700">
                {accessControl.currentPlan} Plan
              </span>
            </div>
          </div>
          
          {selectedModule && (accessControl.currentPlan === 'STARTER' || accessControl.currentPlan === 'SOLO') && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-blue-800 font-medium">
                Selected Module: {moduleConfigs[selectedModule]?.name} {moduleConfigs[selectedModule]?.icon}
              </p>
            </div>
          )}
        </div>

        {/* Current Plan Features */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Current Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <BookOpen className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-800">Modules</p>
                <p className="text-sm text-gray-600">
                  {accessibleModules.length} / {Object.keys(moduleConfigs).length} available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Brain className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">AI Features</p>
                <p className="text-sm text-gray-600">
                  {accessControl.hasFeatureAccess('ai_assessment') ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <Award className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-800">Certificates</p>
                <p className="text-sm text-gray-600">
                  {accessControl.hasFeatureAccess('certificates') ? 'Available' : 'Not Available'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
              <Users className="w-8 h-8 text-orange-600" />
              <div>
                <p className="font-semibold text-gray-800">Support</p>
                <p className="text-sm text-gray-600">
                  {accessControl.hasFeatureAccess('priority_support') ? 'Priority' : 'Standard'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accessible Modules */}
        {accessibleModules.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Available Modules ({accessibleModules.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessibleModules.map((module) => {
                const config = moduleConfigs[module.key];
                return (
                  <div
                    key={module.key}
                    className={`${config.color} border-2 rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    onClick={() => handleModuleSelect(module.key)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{config.icon}</div>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{config.name}</h3>
                    <p className="text-sm mb-4">{config.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium bg-white px-2 py-1 rounded">
                        {config.levels} Levels Available
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Locked Modules */}
        {lockedModules.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Upgrade to Unlock ({lockedModules.length} modules)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lockedModules.map((module) => {
                const config = moduleConfigs[module.key];
                return (
                  <div
                    key={module.key}
                    className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6 relative opacity-75"
                  >
                    <div className="absolute top-4 right-4">
                      <Lock className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="text-4xl mb-4 grayscale">{config.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-600">{config.name}</h3>
                    <p className="text-sm mb-4 text-gray-500">{config.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        Requires {module.requiredPlan}
                      </span>
                      <button
                        onClick={() => handleUpgrade(module.requiredPlan)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upgrade
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upgrade CTA */}
        {accessControl.currentPlan !== 'PRO' && accessControl.currentPlan !== 'INSTITUTIONAL' && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
            <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-4">Ready to Unlock Everything?</h2>
            <p className="text-xl mb-6 opacity-90">
              Get access to all modules, AI features, and certificates with PRO Plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleUpgrade('PRO')}
                className="bg-white text-purple-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-colors"
              >
                Upgrade to PRO - ₹1,433
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                Compare Plans
              </button>
            </div>
          </div>
        )}

        {/* Usage Examples for Different Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Protected Content Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* AI Assessment Feature */}
            <ProtectedRoute requiredFeature="ai_assessment" showUpgradePrompt={false}>
              <div className="bg-gradient-to-r from-green-100 to-blue-100 border border-green-300 rounded-xl p-6">
                <Brain className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Assessment</h3>
                <p className="text-gray-600 mb-4">
                  This feature is only visible to PRO and INSTITUTIONAL users.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Start AI Assessment
                </button>
              </div>
            </ProtectedRoute>

            {/* Certificate Feature */}
            <ProtectedRoute requiredFeature="certificates" showUpgradePrompt={false}>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-xl p-6">
                <Award className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Download Certificates</h3>
                <p className="text-gray-600 mb-4">
                  This feature is only visible to PRO and INSTITUTIONAL users.
                </p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  View Certificates
                </button>
              </div>
            </ProtectedRoute>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDashboard;
