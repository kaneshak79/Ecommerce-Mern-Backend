// import mongoose from "mongoose";

// const wishlistSchema = mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     products: [
//       { product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: Number }
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Wishlist", wishlistSchema);


// wishlist model
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 }
      }
    ]
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;