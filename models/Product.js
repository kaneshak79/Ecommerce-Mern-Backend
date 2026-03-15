import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  price: Number,
  quantity: Number,
  category: String,
  images: [String]
},{ timestamps: true });

export default mongoose.model("Product", productSchema);