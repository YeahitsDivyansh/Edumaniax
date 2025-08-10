# 🔐 EduManiax Access Control System

## Overview

This document outlines the comprehensive access control system implemented for the EduManiax platform. The system determines which features, modules, and content are unlocked after payment based on subscription plans.

## 📋 Table of Contents

1. [Subscription Plans](#subscription-plans)
2. [Access Rules](#access-rules)
3. [Module Access](#module-access)
4. [Feature Access](#feature-access)
5. [Implementation](#implementation)
6. [API Endpoints](#api-endpoints)
7. [Frontend Usage](#frontend-usage)
8. [Database Schema](#database-schema)

## 🎯 Subscription Plans

### STARTER Plan (Free - ₹0)
**Duration:** Forever  
**Target:** New users exploring the platform

#### ✅ What's Included:
- Access to **1 free module** of user's choice
- Basic notes for selected module
- First 3 games/activities per module
- Only Level 1 (beginner) content
- Community forum access (read-only)

#### ❌ Limitations:
- No access to premium modules
- No AI-powered features
- No completion certificates
- No downloadable content
- No offline access

---

### SOLO Plan (₹199 for 3 months)
**Duration:** 3 months  
**Target:** Focused learners wanting depth in one subject

#### ✅ What's Included:
- Full access to **1 premium module** of choice
- Complete notes and resources for selected module
- All interactive activities and assessments
- All levels (beginner to advanced) within selected module
- Progress tracking and basic analytics
- Downloadable content
- Community forum participation

#### ❌ Limitations:
- Limited to 1 module only
- No AI-powered assessment
- No completion certificates
- No live session access

---

### PRO Plan (₹1,433 for 3 months) ⭐ Most Popular
**Duration:** 3 months  
**Target:** Serious learners wanting comprehensive access

#### ✅ What's Included:
- Access to **ALL premium modules**
- Complete notes for every module
- All interactive games and assessments
- **AI-powered personalized learning paths**
- **AI-powered assessment and feedback**
- **Completion certificates**
- Advanced progress tracking and analytics
- Full community forum access
- Downloadable content and offline access
- Email support

#### ❌ Limitations:
- No live expert sessions (reserved for institutional)
- No bulk user management

---

### INSTITUTIONAL Plan (Custom Pricing)
**Duration:** Custom  
**Target:** Schools, companies, and bulk users (30+ users)

#### ✅ What's Included:
- **Everything from PRO plan**
- Access for 30+ users
- **Live lectures by subject matter experts**
- Custom onboarding and training
- **Priority 24/7 support**
- Custom content creation
- White-label solutions
- Advanced admin dashboard
- Bulk user management
- Custom reporting and analytics
- Integration with school/company systems
- Dedicated account manager

---

## 🛡️ Access Rules

### Module Access Rules

| Module | STARTER | SOLO | PRO | INSTITUTIONAL |
|--------|---------|------|-----|---------------|
| Finance Management | ✅ (if selected) | ✅ (if selected) | ✅ | ✅ |
| Digital Marketing | ✅ (if selected) | ✅ (if selected) | ✅ | ✅ |
| Communication | ✅ (if selected) | ✅ (if selected) | ✅ | ✅ |
| Computer Science | ❌ | ✅ (if selected) | ✅ | ✅ |
| Entrepreneurship | ❌ | ✅ (if selected) | ✅ | ✅ |
| Environment | ❌ | ✅ (if selected) | ✅ | ✅ |
| Legal Awareness | ❌ | ❌ | ✅ | ✅ |
| Leadership | ❌ | ❌ | ✅ | ✅ |
| SEL (Social Emotional Learning) | ✅ (if selected) | ✅ (if selected) | ✅ | ✅ |

### Feature Access Rules

| Feature | STARTER | SOLO | PRO | INSTITUTIONAL |
|---------|---------|------|-----|---------------|
| Basic Games | ✅ (limited) | ✅ | ✅ | ✅ |
| Notes | ✅ (basic) | ✅ (complete) | ✅ | ✅ |
| Basic Assessments | ✅ | ✅ | ✅ | ✅ |
| Advanced Assessments | ❌ | ✅ | ✅ | ✅ |
| Progress Tracking | ❌ | ✅ (basic) | ✅ (advanced) | ✅ |
| AI Assessment | ❌ | ❌ | ✅ | ✅ |
| AI Personalization | ❌ | ❌ | ✅ | ✅ |
| Certificates | ❌ | ❌ | ✅ | ✅ |
| Live Sessions | ❌ | ❌ | ❌ | ✅ |
| Custom Content | ❌ | ❌ | ❌ | ✅ |
| Bulk Management | ❌ | ❌ | ❌ | ✅ |
| Priority Support | ❌ | ❌ | ❌ | ✅ |

### Level Access Rules

Each module has 3 levels (beginner, intermediate, advanced):

| Plan | Level 1 | Level 2 | Level 3 |
|------|---------|---------|---------|
| STARTER | ✅ | ❌ | ❌ |
| SOLO | ✅ | ✅ | ✅ |
| PRO | ✅ | ✅ | ✅ |
| INSTITUTIONAL | ✅ | ✅ | ✅ |

---

## 🔧 Implementation

### Server-Side Components

#### 1. Access Control Utility (`server/utils/accessControl.js`)
```javascript
// Core functions for checking access
hasModuleAccess(userPlan, module, selectedModule)
hasFeatureAccess(userPlan, feature)
hasLevelAccess(userPlan, module, level)
getPlanDetails(userPlan)
getUpgradeInfo(currentPlan, requiredPlan)
```

#### 2. Access Middleware (`server/middlewares/accessMiddleware.js`)
```javascript
// Middleware functions for route protection
requireAuth() // Authentication check
requireModuleAccess(moduleKey) // Module access check
requireFeatureAccess(feature) // Feature access check
requirePlanLevel(requiredPlan) // Plan level check
requireChallengeAccess(moduleKey, challengeLevel) // Challenge access check
```

#### 3. Access Routes (`server/routes/accessRoutes.js`)
```javascript
// API endpoints for access management
GET /access/summary/:userId // Complete access summary
GET /access/check-module/:userId/:moduleKey // Check module access
GET /access/check-feature/:userId/:feature // Check feature access
GET /access/modules/:userId // Get all modules with access status
GET /access/features/:userId // Get all features with access status
POST /access/update-selected-module/:userId // Update selected module
```

### Client-Side Components

#### 1. Access Control Hook (`client/src/utils/accessControl.js`)
```javascript
// React hook for access control
const accessControl = useAccessControl(subscriptions, selectedModule);

// Available methods:
accessControl.hasModuleAccess(moduleKey)
accessControl.hasFeatureAccess(feature)
accessControl.getAccessibleModules()
accessControl.getUpgradeSuggestions()
accessControl.shouldShowUpgradePrompt()
```

#### 2. Protected Route Component (`client/src/components/ProtectedRoute.jsx`)
```jsx
// Component for protecting routes and content
<ProtectedRoute 
  requiredPlan="PRO"
  requiredModule="finance"
  requiredLevel={2}
  showUpgradePrompt={true}
>
  <YourComponent />
</ProtectedRoute>
```

---

## 🚀 API Endpoints

### Authentication
```
POST /auth/login
POST /auth/register
POST /auth/verify-otp
```

### Access Control
```
GET    /access/summary/:userId
GET    /access/check-module/:userId/:moduleKey
GET    /access/check-feature/:userId/:feature
GET    /access/modules/:userId
GET    /access/features/:userId
GET    /access/upgrade-options/:userId
POST   /access/update-selected-module/:userId
GET    /access/activity-limits/:userId/:moduleKey
```

### Payment & Subscriptions
```
POST   /payment/create-order
POST   /payment/verify-payment
GET    /payment/subscriptions/:userId
GET    /payment/check-subscription/:userId/:planType
```

### Module Access (with middleware protection)
```
GET    /finance/*           // requireModuleAccess('finance')
GET    /digital-marketing/* // requireModuleAccess('digital-marketing')
GET    /communication/*     // requireModuleAccess('communication')
GET    /computers/*         // requireModuleAccess('computers')
GET    /entrepreneurship/*  // requireModuleAccess('entrepreneurship')
GET    /environment/*       // requireModuleAccess('environment')
GET    /law/*               // requireModuleAccess('law')
GET    /leadership/*        // requireModuleAccess('leadership')
GET    /sel/*               // requireModuleAccess('sel')
```

---

## 💻 Frontend Usage

### 1. Using ProtectedRoute for Content

```jsx
import ProtectedRoute from '../components/ProtectedRoute';

// Protect entire module
<ProtectedRoute requiredModule="finance">
  <FinanceModule />
</ProtectedRoute>

// Protect specific level within module
<ProtectedRoute 
  requiredModule="finance" 
  requiredLevel={2}
  showUpgradePrompt={true}
>
  <AdvancedFinanceContent />
</ProtectedRoute>

// Protect specific feature
<ProtectedRoute requiredFeature="ai_assessment">
  <AIAssessmentComponent />
</ProtectedRoute>
```

### 2. Using Access Control Hook

```jsx
import { useAccessControl } from '../utils/accessControl';

function MyComponent() {
  const { subscriptions } = useSubscription();
  const selectedModule = localStorage.getItem('selectedModule');
  const accessControl = useAccessControl(subscriptions, selectedModule);

  // Check access
  const canAccessFinance = accessControl.hasModuleAccess('finance');
  const canUseAI = accessControl.hasFeatureAccess('ai_assessment');
  
  // Get upgrade suggestions
  const upgradeInfo = accessControl.getUpgradeSuggestions('finance', 2);
  
  // Show different content based on access
  return (
    <div>
      {canAccessFinance ? (
        <FinanceContent />
      ) : (
        <UpgradePrompt upgradeInfo={upgradeInfo} />
      )}
    </div>
  );
}
```

### 3. Conditional Feature Display

```jsx
function FeatureList() {
  const accessControl = useAccessControl();
  
  return (
    <div>
      {accessControl.hasFeatureAccess('ai_assessment') && (
        <AIAssessmentButton />
      )}
      
      {accessControl.hasFeatureAccess('certificates') && (
        <CertificateDownload />
      )}
      
      {!accessControl.hasFeatureAccess('ai_assessment') && (
        <UpgradePrompt feature="ai_assessment" />
      )}
    </div>
  );
}
```

---

## 🗄️ Database Schema

### Updated User Model
```prisma
model User {
  id                         String    @id @default(cuid())
  phonenumber                String    @unique
  email                      String?                     
  name                       String
  age                        Int
  userClass                  String
  characterGender            String
  characterName              String
  characterStyle             String
  characterTraits            String[]
  selectedModule             String?   // NEW: For STARTER/SOLO plans
  createdAt                  DateTime  @default(now())
  subscriptions              Subscription[]
  payments                   Payment[]
  // ... other relationships
}
```

### Subscription Model
```prisma
model Subscription {
  id            String            @id @default(cuid())
  userId        String
  planType      String            // "STARTER", "SOLO", "PRO", "INSTITUTIONAL"
  status        SubscriptionStatus @default(ACTIVE)
  startDate     DateTime          @default(now())
  endDate       DateTime
  amount        Float
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt
  user          User              @relation(fields: [userId], references: [id])
  payments      Payment[]

  @@unique([userId, planType])
}
```

---

## 🔄 Migration and Upgrade Paths

### For Existing Users
1. **Starter Plan Users:** Can upgrade to SOLO (₹199) or PRO (₹1,433)
2. **Solo Plan Users:** Can upgrade to PRO (₹1,433) for full access
3. **Pro Plan Users:** Can upgrade to INSTITUTIONAL for bulk features

### Upgrade Incentives
- **SOLO to PRO:** Access to all 9 modules vs just 1
- **Any to PRO:** AI-powered features and certificates
- **Any to INSTITUTIONAL:** Live expert sessions and bulk management

---

## 🛠️ Testing and Development

### How to Test Access Control

1. **Start servers:**
   ```bash
   # Backend
   cd server && npm start
   
   # Frontend  
   cd client && npm run dev
   ```

2. **Test different plans:**
   - Create users with different subscription plans
   - Try accessing protected content
   - Verify upgrade prompts appear correctly

3. **Test API endpoints:**
   ```bash
   # Check access summary
   curl http://localhost:3000/access/summary/USER_ID
   
   # Check module access
   curl http://localhost:3000/access/check-module/USER_ID/finance
   
   # Check feature access
   curl http://localhost:3000/access/check-feature/USER_ID/ai_assessment
   ```

---

## 🚨 Security Considerations

1. **Server-side validation:** All access checks are performed on the server
2. **Token verification:** User authentication is required for all protected endpoints
3. **Plan validation:** Subscription status and expiry dates are checked
4. **Rate limiting:** API endpoints are protected against abuse
5. **Error handling:** Graceful fallbacks for access denied scenarios

---

## 📈 Monitoring and Analytics

### Key Metrics to Track
- Conversion rates from free to paid plans
- Module usage by plan type
- Feature adoption rates
- Upgrade prompt effectiveness
- User engagement by subscription level

### Access Logs
- Track which features users attempt to access
- Monitor upgrade prompt interactions
- Analyze conversion funnels

---

## 🔮 Future Enhancements

1. **Dynamic Pricing:** Adjust pricing based on usage and demand
2. **Trial Periods:** Offer limited-time access to premium features
3. **Family Plans:** Discounted plans for multiple users
4. **Corporate Packages:** Enterprise features for large organizations
5. **API Rate Limiting:** Throttle API usage based on plan type
6. **Advanced Analytics:** Machine learning insights for personalization

---

## 📞 Support and Troubleshooting

### Common Issues
1. **Access denied errors:** Check subscription status and expiry
2. **Module not accessible:** Verify selected module for STARTER/SOLO users
3. **Feature not working:** Confirm feature is available in current plan
4. **Upgrade not reflecting:** Check payment completion and subscription creation

### Contact Information
- **Technical Support:** dev@edumaniax.com
- **Billing Issues:** billing@edumaniax.com
- **General Inquiries:** support@edumaniax.com

---

*This documentation is regularly updated. Last updated: August 2025*
