# Razorpay Payment Integration Setup Guide

## ⚠️ Important: Production Safety

This payment integration is **disabled by default** to ensure it doesn't affect your production environment until approved.

## Environment Configuration

### For Development (Local Testing)
To enable payment features in development:

1. **Client (.env)**:
   ```env
   VITE_PAYMENT_ENABLED=true
   VITE_RAZORPAY_KEY_ID=rzp_test_5eCI2O6pKy76UK
   ```

2. **Server (.env)**:
   ```env
   PAYMENT_ENABLED=true
   RAZORPAY_KEY_ID=rzp_test_5eCI2O6pKy76UK
   RAZORPAY_SECRET_KEY=8G9exxEoj2arjqvEwYFmiJ05
   ```

### For Production (Cloud Deployment)
The payment features are **automatically disabled** until you're ready to enable them:

1. **Client**: `VITE_PAYMENT_ENABLED=false` (default)
2. **Server**: `PAYMENT_ENABLED=false` (default)

## What's Included

### Backend Features
- ✅ Payment routes with feature flags (`/payment/*`)
- ✅ Razorpay order creation and verification
- ✅ Database schema for subscriptions and payments
- ✅ Safe middleware that blocks payment calls when disabled
- ✅ Feature status endpoint to check if payments are enabled

### Frontend Features
- ✅ Payment component with Razorpay integration
- ✅ Payment hook that checks feature availability
- ✅ Updated PaymentRequired page
- ✅ Graceful fallback when payments are disabled

### Database Schema
- ✅ `Subscription` model for user subscriptions
- ✅ `Payment` model for payment tracking
- ✅ Proper relationships with existing User model

## Plan Structure
- **STARTER**: Free (₹0) - 30 days
- **SOLO**: ₹199 - 90 days (3 months)
- **PRO**: ₹1,433 - 90 days (3 months)
- **INSTITUTIONAL**: Custom pricing

## Testing Razorpay (Test Mode)
When enabled in development:
1. Use test card: 4111 1111 1111 1111
2. Any future date for expiry
3. Any CVV (e.g., 123)
4. Any name

## Production Deployment Steps

### When Ready to Enable Payments:
1. **Update Environment Variables**:
   ```env
   # Server
   PAYMENT_ENABLED=true
   
   # Client  
   VITE_PAYMENT_ENABLED=true
   ```

2. **Run Database Migration**:
   ```bash
   cd server
   npx prisma migrate deploy
   ```

3. **Update Razorpay Keys**:
   - Replace test keys with live keys
   - Update webhook URLs if needed

## Security Features
- ✅ Payment signature verification
- ✅ Feature flags prevent accidental activation
- ✅ Safe error handling
- ✅ Environment-based configuration

## Files Modified/Added

### Server
- `routes/paymentRoutes.js` - Payment API endpoints
- `prisma/schema.prisma` - Database models
- `server.js` - Route registration
- `.env` - Environment variables

### Client
- `hooks/usePayment.js` - Payment functionality
- `pages/Payment.jsx` - Payment component
- `pages/PaymentRequired.jsx` - Access control
- `components/ProtectedRoute.jsx` - Route protection
- `contexts/SubscriptionContext.jsx` - Subscription management
- `.env` - Environment variables

## Current Status
- ✅ **Production Safe**: All payment features disabled by default
- ✅ **Development Ready**: Can be enabled locally for testing
- ✅ **No Breaking Changes**: Existing functionality preserved
- ✅ **Gradual Rollout**: Can be enabled when approved

## Next Steps
1. Test locally with `PAYMENT_ENABLED=true`
2. Review and approve the implementation
3. Update production environment variables when ready
4. Run database migrations in production
5. Monitor payment flows and user experience
