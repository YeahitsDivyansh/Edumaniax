/**
 * Subscription Status Component
 * 
 * A React component to display subscription status, remaining days,
 * and expiry warnings to users.
 */

import React from 'react';
import { Clock, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const SubscriptionStatus = ({ subscription, showDetails = true }) => {
  if (!subscription) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700">No active subscription</span>
        </div>
      </div>
    );
  }

  const {
    planType,
    remainingDays,
    daysSincePurchase,
    isExpired,
    selectedModule,
    endDate,
    usagePercentage,
    totalDays
  } = subscription;

  // Determine status color and icon
  const getStatusInfo = () => {
    if (isExpired) {
      return {
        color: 'red',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-700',
        icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
        status: 'Expired'
      };
    }
    
    if (remainingDays <= 3) {
      return {
        color: 'orange',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-700',
        icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
        status: 'Expiring Soon'
      };
    }
    
    if (remainingDays <= 7) {
      return {
        color: 'yellow',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-700',
        icon: <Clock className="w-5 h-5 text-yellow-500" />,
        status: 'Active'
      };
    }
    
    return {
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      status: 'Active'
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`${statusInfo.bgColor} border ${statusInfo.borderColor} rounded-lg p-4`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {statusInfo.icon}
          <div>
            <h3 className={`font-semibold ${statusInfo.textColor}`}>
              {planType} Plan - {statusInfo.status}
            </h3>
            {selectedModule && (
              <p className="text-sm text-gray-600 mt-1">
                Module: {selectedModule}
              </p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          {!isExpired ? (
            <div className={`text-lg font-bold ${statusInfo.textColor}`}>
              {remainingDays} days left
            </div>
          ) : (
            <div className="text-lg font-bold text-red-600">
              Expired
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 space-y-2">
          {/* Progress bar */}
          {!isExpired && totalDays && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Usage Progress</span>
                <span>{usagePercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    usagePercentage < 50 ? 'bg-green-500' :
                    usagePercentage < 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Subscription details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                Days used: {daysSincePurchase}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                Expires: {new Date(endDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Warning messages */}
          {!isExpired && remainingDays <= 7 && (
            <div className={`p-3 rounded-md ${
              remainingDays <= 3 ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <p className={`text-sm ${
                remainingDays <= 3 ? 'text-red-700' : 'text-yellow-700'
              }`}>
                {remainingDays <= 3 
                  ? '⚠️ Your subscription expires in 3 days or less!'
                  : '⏰ Your subscription expires within a week.'
                }
              </p>
            </div>
          )}

          {isExpired && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">
                ❌ Your subscription has expired. Renew now to continue accessing premium features.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Multiple Subscriptions Display Component
 */
export const SubscriptionList = ({ subscriptions, title = "Your Subscriptions" }) => {
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">No subscriptions found</p>
      </div>
    );
  }

  const activeSubscriptions = subscriptions.filter(sub => !sub.isExpired && sub.status === 'ACTIVE');
  const expiredSubscriptions = subscriptions.filter(sub => sub.isExpired || sub.status === 'EXPIRED');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      
      {activeSubscriptions.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-green-700 mb-3">Active Subscriptions</h3>
          <div className="space-y-3">
            {activeSubscriptions.map((subscription, index) => (
              <SubscriptionStatus
                key={subscription.id || index}
                subscription={subscription}
                showDetails={true}
              />
            ))}
          </div>
        </div>
      )}

      {expiredSubscriptions.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-red-700 mb-3">Expired Subscriptions</h3>
          <div className="space-y-3">
            {expiredSubscriptions.map((subscription, index) => (
              <SubscriptionStatus
                key={subscription.id || index}
                subscription={subscription}
                showDetails={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Compact Subscription Badge Component
 */
export const SubscriptionBadge = ({ subscription }) => {
  if (!subscription) return null;

  const { planType, remainingDays, isExpired } = subscription;

  if (isExpired) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        <AlertTriangle className="w-3 h-3" />
        {planType} - Expired
      </span>
    );
  }

  const badgeColor = remainingDays <= 3 ? 'bg-red-100 text-red-700' :
                    remainingDays <= 7 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
      <CheckCircle className="w-3 h-3" />
      {planType} - {remainingDays}d left
    </span>
  );
};

export default SubscriptionStatus;
