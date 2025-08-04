import dotenv from "dotenv";
dotenv.config();

import prisma from "../utils/prisma.js";
import connectionManager from "../connectionManager.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken"; 
import axios from "axios";


const sendOtpForRegistration = async (req, res) => {
  const { phonenumber } = req.body;

  if (!phonenumber) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  const existingUser = await prisma.user.findUnique({ where: { phonenumber } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists. Please login." });
  }

  return sendOtpHelper(phonenumber, res);
};

const sendOtpForLogin = async (req, res) => {
  const { phonenumber } = req.body;

  if (!phonenumber) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  const existingUser = await prisma.user.findUnique({ where: { phonenumber } });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found. Please register." });
  }

  return sendOtpHelper(phonenumber, res);
};


const sendOtpHelper = async (phonenumber, res) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  try {
    await prisma.otpVerification.upsert({
      where: { phonenumber },
      update: { otp, otpExpiration },
      create: { phonenumber, otp, otpExpiration },
    });

    const message = `Your EduManiax OTP for verification is: ${otp}. OTP is confidential, refrain from sharing it with anyone. By Edumarc Technologies`;

    const response = await axios.post(
      "https://smsapi.edumarcsms.com/api/v1/sendsms",
      {
        number: [phonenumber],
        message,
        senderId: "EDUMRC",
        templateId: "1707168926925165526",
      },
      {
        headers: {
          apikey: process.env.EDUMARC_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const { success, data } = response.data;

    if (success) {
      return res.status(200).json({ message: "OTP sent successfully" });
    } else {
      console.error("Unexpected SMS response:", response.data);
      return res.status(500).json({ message: "Failed to send OTP", details: response.data });
    }
  } catch (err) {
    console.error("Error sending OTP:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Verify OTP and Register
const verifyOtpAndRegister = async (req, res) => {
  const {
    phonenumber,
    otp,
    name,
    age,
    userClass,
    characterGender,
    characterName,
    characterStyle,
    characterTraits,
  } = req.body;

  if (
    !phonenumber ||
    !otp ||
    !name ||
    !age ||
    !userClass ||
    !characterGender ||
    !characterName ||
    !characterStyle ||
    !characterTraits
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const otpRecord = await prisma.otpVerification.findUnique({
    where: { phonenumber },
  });

  if (
    !otpRecord ||
    otpRecord.otp !== otp ||
    new Date() > otpRecord.otpExpiration
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const existingUser = await prisma.user.findUnique({ where: { phonenumber } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await prisma.user.create({
    data: {
      phonenumber,
      name,
      age,
      userClass,
      characterGender,
      characterName,
      characterStyle,
      characterTraits,
    },
  });

  await prisma.otpVerification.delete({ where: { phonenumber } });

  const token = jwt.sign({ id: user.id }, process.env.Jwt_sec, {
    expiresIn: "5d",
  });

  res.status(201).json({ token, user });
};

// Verify OTP and Login
const verifyOtpAndLogin = async (req, res) => {
  const { phonenumber, otp } = req.body;

  if (!phonenumber || !otp) {
    return res
      .status(400)
      .json({ message: "Phone number and OTP are required" });
  }

  const otpRecord = await prisma.otpVerification.findUnique({
    where: { phonenumber },
  });

  if (
    !otpRecord ||
    otpRecord.otp !== otp ||
    new Date() > otpRecord.otpExpiration
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const user = await prisma.user.findUnique({ where: { phonenumber } });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found. Please register." });
  }

  await prisma.otpVerification.delete({ where: { phonenumber } });

  const token = jwt.sign({ id: user.id }, process.env.Jwt_sec, {
    expiresIn: "5d",
  });

  res.status(200).json({ success: true, message: "Logged in", token, user });
};

const getMe = async (req, res) => {
  try {
    // User is already authenticated by middleware and available in req.user
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        phonenumber: true,
        email: true,
        name: true,
        age: true,
        userClass: true,
        characterGender: true,
        characterName: true,
        characterStyle: true,
        characterTraits: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Test Route
const test = async (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to EduManiax!" });
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    // User is already authenticated by middleware and available in req.user
    const userId = req.user.id;
    const allowedFields = ['name', 'age', 'userClass', 'phonenumber', 'email'];
    const updateData = {};

    // Only allow updating specific fields
    for (const [key, value] of Object.entries(req.body)) {
      if (allowedFields.includes(key)) {
        updateData[key] = value;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    // Additional validation
    if (updateData.age) {
      const age = parseInt(updateData.age);
      if (age < 1 || age > 100) {
        return res.status(400).json({ message: "Age must be between 1 and 100" });
      }
      updateData.age = age;
    }

    if (updateData.phonenumber) {
      // Check if phone number is already taken by another user
      const existingUser = await prisma.user.findFirst({
        where: {
          phonenumber: updateData.phonenumber,
          NOT: { id: userId }
        }
      });
      
      if (existingUser) {
        return res.status(400).json({ message: "Phone number already in use" });
      }
    }

    if (updateData.email) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData.email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      
      // Check if email is already taken by another user
      const existingEmailUser = await prisma.user.findFirst({
        where: {
          email: updateData.email,
          NOT: { id: userId }
        }
      });
      
      if (existingEmailUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        phonenumber: true,
        email: true,
        name: true,
        age: true,
        userClass: true,
        characterGender: true,
        characterName: true,
        characterStyle: true,
        characterTraits: true,
        createdAt: true,
      },
    });

    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export {
  sendOtpForRegistration,
  sendOtpForLogin,
  verifyOtpAndRegister,
  verifyOtpAndLogin,
  getMe,
  test,
  updateProfile
};
