// controllers/notificationController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Create a new notification
 */
export const createNotification = async (type, message, data, inquiryId = null, paymentId = null) => {
  try {
    const notification = await prisma.salesNotification.create({
      data: {
        type,
        message,
        data: JSON.stringify(data),
        inquiryId,
        paymentId
      }
    });
    
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

/**
 * Get all notifications with pagination and filtering
 */
export const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, type } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build where clause for filtering
    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    if (type) {
      where.type = type;
    }
    
    // Get total count for pagination
    const totalCount = await prisma.salesNotification.count({ where });
    
    // Get notifications
    const notifications = await prisma.salesNotification.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: parseInt(limit)
    });
    
    res.status(200).json({
      success: true,
      data: {
        notifications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalCount,
          totalPages: Math.ceil(totalCount / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error("Error getting notifications:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve notifications", 
      error: error.message 
    });
  }
};

/**
 * Mark notification(s) as read
 */
export const markNotificationsAsRead = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Notification IDs are required" 
      });
    }
    
    // Update each notification
    await Promise.all(ids.map(async (id) => {
      await prisma.salesNotification.update({
        where: { id },
        data: {
          status: 'READ',
          readAt: new Date(),
          readBy: {
            push: req.user.id
          }
        }
      });
    }));
    
    res.status(200).json({
      success: true,
      message: "Notifications marked as read"
    });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to mark notifications as read", 
      error: error.message 
    });
  }
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async (req, res) => {
  try {
    const count = await prisma.salesNotification.count({
      where: { status: 'UNREAD' }
    });
    
    res.status(200).json({
      success: true,
      data: { count }
    });
  } catch (error) {
    console.error("Error getting unread count:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to get unread notification count", 
      error: error.message 
    });
  }
};
