// controllers/salesAuthController.js

import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/**
 * Login handler for sales team members
 */
export const salesLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Username and password are required" 
      });
    }

    // Find the user (first try by username if it exists, fall back to phonenumber for backward compatibility)
    let user;
    
    // First try to find by username field if it exists in the schema
    try {
      user = await prisma.user.findFirst({ 
        where: { 
          OR: [
            { username },
            { phonenumber: username } // Try phonenumber as fallback
          ]
        } 
      });
    } catch (error) {
      // If username field doesn't exist in the schema, fall back to just phonenumber
      user = await prisma.user.findUnique({ 
        where: { phonenumber: username } 
      });
    }
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Check if user has sales role
    if (user.role !== 'SALES' && user.role !== 'ADMIN') {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied - insufficient privileges" 
      });
    }

    // For this example, we're checking a plaintext password directly
    // In a real application, you would use bcrypt.compare(password, user.passwordHash)
    if (password !== process.env.SALES_PASSWORD) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        role: user.role
      }, 
      process.env.Jwt_sec, 
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        phonenumber: user.phonenumber
      }
    });
  } catch (error) {
    console.error("Sales login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

/**
 * Create a new sales user (admin only)
 */
export const createSalesUser = async (req, res) => {
  try {
    const { name, phonenumber, email, password } = req.body;

    // Check if the requesting user is an admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ 
        success: false, 
        message: "Only administrators can create sales accounts" 
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ 
      where: { phonenumber } 
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User with this phone number already exists" 
      });
    }

    // Create a new sales user
    // For simplicity, we're creating a standard user with SALES role
    // In a real application, you might have a separate table for staff users
    const newUser = await prisma.user.create({
      data: {
        name,
        phonenumber,
        email,
        role: 'SALES',
        // Dummy values for required fields (in a real application, you'd have different models)
        age: 0,
        userClass: 'SALES',
        characterGender: 'N/A',
        characterName: 'N/A',
        characterStyle: 'N/A',
        characterTraits: ['SALES'],
      }
    });

    res.status(201).json({
      success: true,
      message: "Sales user created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        role: newUser.role,
        email: newUser.email,
        phonenumber: newUser.phonenumber
      }
    });
  } catch (error) {
    console.error("Create sales user error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};
