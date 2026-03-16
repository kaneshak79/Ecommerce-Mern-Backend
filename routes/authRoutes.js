


import express from "express";
import {
  registerSeller,
  registerBuyer,
  login,
  getProfile,
  updateProfile,
  updateStore,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ===============================
// Public Routes
// ===============================
router.post("/register/seller", registerSeller);
router.post("/register/buyer", registerBuyer);
router.post("/login", login);

router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);

// ===============================
// Protected Routes
// ===============================
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, changePassword);

// ===============================
// Seller-only Store Update
// ===============================
router.put("/store", protect, authorizeRoles("seller"), updateStore);

export default router;