import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
// import { createOrder, getMyOrders, getAllOrders } from "../controllers/orderController.js";
// After (correct)
import { createOrder, getMyOrders, getSellerOrders } from "../controllers/orderController.js";
const router = express.Router();

router.post("/", protect, authorizeRoles("buyer"), createOrder);
router.get("/myorders", protect, authorizeRoles("buyer"), getMyOrders);
// After
router.get("/seller", protect, getSellerOrders);
export default router;