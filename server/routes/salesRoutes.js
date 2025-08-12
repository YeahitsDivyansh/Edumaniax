import express from 'express';
import { 
  createInstitutionalInquiry,
  getInquiries, 
  updateInquiry,
  getSalesAnalytics,
  handlePaymentWebhook
} from '../controllers/salesController.js';
import { checkAuth, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route for creating inquiries (from contact form)
router.post('/inquiries', createInstitutionalInquiry);

// Protected routes requiring authentication and sales/admin role
router.get('/inquiries', checkAuth, checkRole(['ADMIN', 'SALES']), getInquiries);
router.put('/inquiries/:id', checkAuth, checkRole(['ADMIN', 'SALES']), updateInquiry);
router.get('/analytics', checkAuth, checkRole(['ADMIN', 'SALES']), getSalesAnalytics);

// Webhook endpoint for payment notifications
router.post('/payment-webhook', handlePaymentWebhook);

export default router;
