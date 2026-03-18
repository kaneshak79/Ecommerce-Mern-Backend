



// import Wishlist from "../models/Wishlist.js";

// // Add product to wishlist
// export const addToWishlist = async (req, res) => {
//   const { productId, quantity } = req.body;
//   let wishlist = await Wishlist.findOne({ user: req.user._id });

//   if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });

//   const itemIndex = wishlist.products.findIndex(p => p.product.equals(productId));
//   if (itemIndex > -1) {
//     wishlist.products[itemIndex].quantity += quantity;
//   } else {
//     wishlist.products.push({ product: productId, quantity });
//   }

//   await wishlist.save();

//   // Populate product details
//   const populatedWishlist = await Wishlist.findById(wishlist._id).populate({
//     path: "products.product",
//     select: "title description price images category"
//   });

//   res.json(populatedWishlist);
// };

// // Get Wishlist
// export const getWishlist = async (req, res) => {
//   const wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
//     path: "products.product",
//     select: "title description price images category"
//   });

//   if (!wishlist) return res.status(404).json({ message: "Wishlist empty" });

//   res.json(wishlist);
// };

// // Update Wishlist product quantity
// export const updateWishlist = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const wishlist = await Wishlist.findOne({ user: req.user._id });

//   if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

//   const itemIndex = wishlist.products.findIndex(p => p.product.equals(productId));
//   if (itemIndex > -1) {
//     wishlist.products[itemIndex].quantity = quantity;
//     await wishlist.save();
//   } else {
//     return res.status(404).json({ message: "Product not in wishlist" });
//   }

//   const populatedWishlist = await Wishlist.findById(wishlist._id).populate({
//     path: "products.product",
//     select: "title description price images category"
//   });

//   res.json(populatedWishlist);
// };

// // Delete product from wishlist
// export const removeFromWishlist = async (req, res) => {
//   // ...code stays the same

//   const { productId } = req.params;
//   const wishlist = await Wishlist.findOne({ user: req.user._id });

//   if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

//   wishlist.products = wishlist.products.filter(p => !p.product.equals(productId));
//   await wishlist.save();

//   const populatedWishlist = await Wishlist.findById(wishlist._id).populate({
//     path: "products.product",
//     select: "title description price images category"
//   });

//   res.json(populatedWishlist);
// };



import mongoose from "mongoose";
import Wishlist from "../models/Wishlist.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user._id);

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] });

    const itemIndex = wishlist.products.findIndex(
      p => p.product.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      wishlist.products[itemIndex].quantity += quantity;
    } else {
      wishlist.products.push({ product: productId, quantity });
    }

    await wishlist.save();

    const populatedWishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title description price images category",
    });

    res.json(populatedWishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title description price images category",
    });

    if (!wishlist) return res.status(404).json({ message: "Wishlist empty" });

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Wishlist product quantity
export const updateWishlist = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    const itemIndex = wishlist.products.findIndex(
      p => p.product.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      wishlist.products[itemIndex].quantity = quantity;
      await wishlist.save();
    } else {
      return res.status(404).json({ message: "Product not in wishlist" });
    }

    const populatedWishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title description price images category",
    });

    res.json(populatedWishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(
      p => p.product.toString() !== productId.toString()
    );

    await wishlist.save();

    const populatedWishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title description price images category",
    });

    res.json(populatedWishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};