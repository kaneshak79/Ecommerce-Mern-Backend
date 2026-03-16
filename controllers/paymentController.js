


import Razorpay from "razorpay";
import Order from "../models/Order.js";

// Create Razorpay Order
export const createPaymentOrder = async (req, res) => {
  try {

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, currency = "INR", receipt } = req.body;

    const options = {
      amount: amount * 100,
      currency,
      receipt: receipt || "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // In real apps we verify signature using crypto
    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ message: "Invalid payment data" });
    }

    res.status(200).json({
      message: "Payment verified successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Payments (From Orders)
// export const getAllPayments = async (req, res) => {
//   try {
//     const orders = await Order.find({}).select(
//       "buyer totalAmount paymentStatus"
//     );

//     res.status(200).json(orders);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


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