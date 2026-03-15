import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { addToWishlist, getWishlist, updateWishlist, removeFromWishlist } from "../controllers/wishlistController.js";

const router = express.Router();
router.use(protect, authorizeRoles("buyer"));

router.post("/", addToWishlist);
router.get("/", getWishlist);
router.put("/", updateWishlist);
router.delete("/:productId", removeFromWishlist);

export default router;