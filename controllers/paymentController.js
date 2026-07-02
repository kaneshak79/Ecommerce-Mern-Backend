// }
// };


import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

// ✅ Create Razorpay Order
export const createPaymentOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ VERIFY PAYMENT (IMPORTANT FIX)
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment" });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified",
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Payments
export const getAllPayments = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("buyer", "name email")
      .select("buyer totalAmount paymentStatus paymentId");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
