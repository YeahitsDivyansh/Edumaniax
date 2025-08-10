 import { Router } from "express";
import authenticateUser from "../middlewares/authMiddleware.js";
import {
  requireModuleAccess,
  requireChallengeAccess,
  attachSubscriptionInfo
} from "../middlewares/accessMiddleware.js";
import {
  markChallengeComplete,
  getUserProgress,
} from "../controllers/finanaceController.js";

const router = Router();

// Apply authentication and subscription info to all routes
router.use(authenticateUser);
router.use(attachSubscriptionInfo);

// Finance module access required for all routes
router.use(requireModuleAccess('finance'));

// Route to mark challenge complete with level access check
router.post("/challenge-complete", 
  requireChallengeAccess('finance', 1), // Adjust level as needed
  markChallengeComplete
);

// Route to get user progress
router.get("/get-challenges", getUserProgress);

export default router;
