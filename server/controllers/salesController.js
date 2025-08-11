import { PrismaClient } from '@prisma/client';
import { createNotification } from './notificationController.js';

const prisma = new PrismaClient();

/**
 * Creates a new institutional inquiry and sends notification
 */
export const createInstitutionalInquiry = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      organizationalEmail, 
      organization, 
      phone, 
      employees, 
      message 
    } = req.body;

    // Validate required fields
    if (!name || !email || !organizationalEmail || !organization) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, organizational email, and organization are required fields' 
      });
    }

    // Create inquiry in database
    const inquiry = await prisma.institutionalInquiry.create({
      data: {
        contactName: name,
        contactEmail: email,
        contactPhone: phone || '',
        organizationName: organization,
        organizationType: 'BUSINESS', // Default value, could be made dynamic
        studentCount: employees || 'Not specified',
        message: message || '',
        status: 'NEW'
      }
    });

    // Create notification
    await createNotification(
      'NEW_INQUIRY',
      `New inquiry from ${name} at ${organization}`,
      inquiry,
      inquiry.id
    );

    res.status(201).json({
      success: true,
      message: 'Inquiry created successfully',
      data: inquiry
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create inquiry', 
      error: error.message 
    });
  }
};

/**
 * Get all institutional inquiries with filtering options
 */
export const getInquiries = async (req, res) => {
  try {
    const { 
      status, 
      startDate, 
      endDate, 
      sort = 'createdAt', 
      order = 'desc',
      page = 1,
      limit = 10,
      search
    } = req.query;
    
    // Build filter conditions
    let where = {};
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { contactName: { contains: search, mode: 'insensitive' } },
        { organizationName: { contains: search, mode: 'insensitive' } },
        { contactEmail: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Get total count for pagination
    const totalCount = await prisma.institutionalInquiry.count({ where });

    // Execute query with filters, sorting, and pagination
    const inquiries = await prisma.institutionalInquiry.findMany({
      where,
      orderBy: {
        [sort]: order.toLowerCase()
      },
      skip,
      take
    });

    res.status(200).json({
      success: true,
      count: totalCount,
      data: inquiries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalCount
      }
    });
  } catch (error) {
    console.error('Error getting inquiries:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve inquiries', 
      error: error.message 
    });
  }
};

/**
 * Update inquiry status and details
 */
export const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      status, 
      assignedTo, 
      followUpDate, 
      notes 
    } = req.body;

    // Get the existing inquiry to track changes
    const existingInquiry = await prisma.institutionalInquiry.findUnique({
      where: { id }
    });

    if (!existingInquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    const updatedInquiry = await prisma.institutionalInquiry.update({
      where: { id },
      data: {
        status: status || undefined,
        assignedTo: assignedTo || undefined,
        followUpDate: followUpDate ? new Date(followUpDate) : undefined,
        notes: notes || undefined,
        updatedAt: new Date()
      }
    });

    // Create notification for status change
    if (status && status !== existingInquiry.status) {
      await createNotification(
        'INQUIRY_UPDATED',
        `Inquiry status changed from ${existingInquiry.status} to ${status}`,
        updatedInquiry,
        id
      );
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      data: updatedInquiry
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update inquiry', 
      error: error.message 
    });
  }
};

/**
 * Get sales dashboard analytics
 */
export const getSalesAnalytics = async (req, res) => {
  try {
    // Get inquiry statistics by status
    const inquiryStatusCounts = await prisma.$queryRaw`
      SELECT status, COUNT(*) as count
      FROM "InstitutionalInquiry"
      GROUP BY status
    `;

    // Get recent payment data
    const recentPayments = await prisma.payment.findMany({
      where: {
        status: 'COMPLETED'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        subscription: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });

    // Get total revenue by plan type
    const revenueByPlan = await prisma.$queryRaw`
      SELECT "planType", SUM(amount) as total
      FROM "Payment"
      WHERE status = 'COMPLETED'
      GROUP BY "planType"
    `;

    // Get unread notification count
    const unreadNotificationsCount = await prisma.salesNotification.count({
      where: { status: 'UNREAD' }
    });

    // Convert BigInt values to numbers for JSON serialization
    const processedInquiryStatusCounts = inquiryStatusCounts.map(item => ({
      ...item,
      count: Number(item.count)
    }));

    const processedRevenueByPlan = revenueByPlan.map(item => ({
      ...item,
      total: Number(item.total)
    }));

    res.status(200).json({
      success: true,
      data: {
        inquiryStatusCounts: processedInquiryStatusCounts,
        recentPayments,
        revenueByPlan: processedRevenueByPlan,
        unreadNotificationsCount
      }
    });
  } catch (error) {
    console.error('Error getting sales analytics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve sales analytics', 
      error: error.message 
    });
  }
};

/**
 * Handle payment webhook from payment processor
 */
export const handlePaymentWebhook = async (req, res) => {
  try {
    const { event, payload } = req.body;
    
    if (event === 'payment.success') {
      // Process successful payment
      const paymentId = payload.payment.entity.id;
      
      // Update payment status in database
      const payment = await prisma.payment.update({
        where: { razorpayPaymentId: paymentId },
        data: {
          status: 'COMPLETED',
          updatedAt: new Date()
        },
        include: {
          user: true,
          subscription: true
        }
      });

      // Create notification for new payment
      await createNotification(
        'NEW_PAYMENT',
        `New payment of ₹${payment.amount} received for ${payment.planType} plan`,
        payment,
        null,
        payment.id
      );
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing payment webhook:', error);
    res.status(500).json({ error: error.message });
  }
};
