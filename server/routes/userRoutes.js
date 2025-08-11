// routes/userRoutes.js

import { Router } from "express";
import {
  sendOtpForRegistration,
  sendOtpForLogin,
  verifyOtpAndRegister,
  verifyOtpAndLogin,
  test,
  getMe,
  updateProfile,
  uploadAvatar,
  cleanupOrphanedAvatars,
} from "../controllers/userController.js";
import authenticateUser from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.get("/", test);
router.post("/send-otp-register", sendOtpForRegistration);
router.post("/send-otp-login", sendOtpForLogin);
router.post("/verify-otp-register", verifyOtpAndRegister);
router.post("/verify-otp-login", verifyOtpAndLogin);

router.get("/me", authenticateUser, getMe);
router.put("/update-profile", authenticateUser, updateProfile);
router.post("/upload-avatar", authenticateUser, upload.single('avatar'), uploadAvatar);
router.post("/cleanup-avatars", authenticateUser, cleanupOrphanedAvatars);

export default router;
