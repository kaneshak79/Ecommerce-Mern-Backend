// import express from "express";
// import { protect } from "../middlewares/authMiddleware.js";
// import { authorizeRoles } from "../middlewares/roleMiddleware.js";
// import { addReview, getReviews, updateReview, deleteReview } from "../controllers/reviewController.js";

// const router = express.Router();

// router.get("/", getReviews);
// router.post("/", protect, authorizeRoles("buyer"), addReview);
// router.put("/:id", protect, authorizeRoles("buyer"), updateReview);
// router.delete("/:id", protect, authorizeRoles("buyer"), deleteReview);

// export default router;



// // import express from "express";
// // import { addReview, getReviews, updateReview, deleteReview } from "../controllers/reviewController.js";
// // import { protect } from "../middlewares/authMiddleware.js";

// // const router = express.Router();

// // // Add Review (buyer only)
// // router.post("/", authMiddleware, addReview);

// // // Get Reviews for a product
// // router.get("/", getReviews);

// // // Update Review (buyer only)
// // router.put("/:id", authMiddleware, updateReview);

// // // Delete Review (buyer only)
// // router.delete("/:id", authMiddleware, deleteReview);

// // export default router;


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