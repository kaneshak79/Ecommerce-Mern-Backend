
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     products: [
//       {
//         product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//         seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true }
//       }
//     ],
//     totalAmount: { type: Number, required: true },
//     shippingAddress: { type: String, required: true },
//     status: { type: String, default: "pending" } // pending, shipped, delivered, cancelled
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model("Order", orderSchema);
// export default Order;



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
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true }
    },
    status: { type: String, default: "pending" } // pending, shipped, delivered, cancelled
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;