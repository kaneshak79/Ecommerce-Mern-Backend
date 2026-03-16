

import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { addReview, getReviews, updateReview, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

// Get all reviews OR reviews by productId
router.get("/", getReviews);

// Get review by review ID
router.get("/:id", getReviews);

// Add review (buyer only)
router.post("/", protect, authorizeRoles("buyer"), addReview);

// Update review (buyer only)
router.put("/:id", protect, authorizeRoles("buyer"), updateReview);

// Delete review (buyer only)
router.delete("/:id", protect, authorizeRoles("buyer"), deleteReview);

export default router;