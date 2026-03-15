import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { addToCart, getCart, updateCart, deleteFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.use(protect, authorizeRoles("buyer"));
router.post("/", addToCart);
router.get("/", getCart);
router.put("/", updateCart);
router.delete("/:productId", deleteFromCart);

export default router;