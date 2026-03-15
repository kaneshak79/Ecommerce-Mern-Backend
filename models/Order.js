// import mongoose from "mongoose";

// const orderSchema = mongoose.Schema(
//   {
//     buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     products: [
//       { product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: Number }
//     ],
//     totalAmount: Number,
//     status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered
//     shippingAddress: String,
//     paymentStatus: { type: String, default: "Unpaid" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    status: { type: String, default: "pending" } // pending, shipped, delivered, cancelled
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;