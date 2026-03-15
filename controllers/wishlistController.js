// import Wishlist from "../models/Wishlist.js";

// // Add to Wishlist
// export const addToWishlist = async (req,res)=>{
//   const { productId, quantity } = req.body;
//   let wishlist = await Wishlist.findOne({ user: req.user._id });
//   if(!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });

//   const index = wishlist.products.findIndex(p => p.product.equals(productId));
//   if(index>-1) wishlist.products[index].quantity += quantity;
//   else wishlist.products.push({ product: productId, quantity });

//   await wishlist.save();
//   res.json(wishlist);
// };

// // Get Wishlist
// export const getWishlist = async (req,res)=>{
//   const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products.product");
//   res.json(wishlist);
// };

// // Update Wishlist
// export const updateWishlist = async (req,res)=>{
//   const { productId, quantity } = req.body;
//   const wishlist = await Wishlist.findOne({ user: req.user._id });
//   if(!wishlist) return res.status(404).json({ message:"Wishlist not found" });

//   const index = wishlist.products.findIndex(p => p.product.equals(productId));
//   if(index>-1) wishlist.products[index].quantity = quantity;
//   await wishlist.save();
//   res.json(wishlist);
// };

// // Remove from Wishlist
// export const removeFromWishlist = async (req,res)=>{
//   const { productId } = req.params;
//   const wishlist = await Wishlist.findOne({ user: req.user._id });
//   wishlist.products = wishlist.products.filter(p => !p.product.equals(productId));
//   await wishlist.save();
//   res.json(wishlist);
// };



import Wishlist from "../models/Wishlist.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  const { productId, quantity } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });

  const itemIndex = wishlist.products.findIndex(p => p.product.equals(productId));
  if (itemIndex > -1) {
    wishlist.products[itemIndex].quantity += quantity;
  } else {
    wishlist.products.push({ product: productId, quantity });
  }

  await wishlist.save();

  // Populate product details
  const populatedWishlist = await Wishlist.findById(wishlist._id).populate({
    path: "products.product",
    select: "title description price images category"
  });

  res.json(populatedWishlist);
};

// Get Wishlist
export const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
    path: "products.product",
    select: "title description price images category"
  });

  if (!wishlist) return res.status(404).json({ message: "Wishlist empty" });

  res.json(wishlist);
};

// Update Wishlist product quantity
export const updateWishlist = async (req, res) => {
  const { productId, quantity } = req.body;
  const wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

  const itemIndex = wishlist.products.findIndex(p => p.product.equals(productId));
  if (itemIndex > -1) {
    wishlist.products[itemIndex].quantity = quantity;
    await wishlist.save();
  } else {
    return res.status(404).json({ message: "Product not in wishlist" });
  }

  const populatedWishlist = await Wishlist.findById(wishlist._id).populate({
    path: "products.product",
    select: "title description price images category"
  });

  res.json(populatedWishlist);
};

// Delete product from wishlist
export const removeFromWishlist = async (req, res) => {
  // ...code stays the same

  const { productId } = req.params;
  const wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

  wishlist.products = wishlist.products.filter(p => !p.product.equals(productId));
  await wishlist.save();

  const populatedWishlist = await Wishlist.findById(wishlist._id).populate({
    path: "products.product",
    select: "title description price images category"
  });

  res.json(populatedWishlist);
};