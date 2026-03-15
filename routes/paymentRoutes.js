import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { createPaymentOrder, verifyPayment, getAllPayments } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", protect, authorizeRoles("buyer"), createPaymentOrder);
router.post("/verify", protect, authorizeRoles("buyer"), verifyPayment);
router.get("/", protect, authorizeRoles("seller","buyer"), getAllPayments);

export default router;