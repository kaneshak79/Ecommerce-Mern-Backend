// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";
// export const createOrder = async (req, res) => {
//   try {
//     const { shippingAddress } = req.body;

//     // 1️⃣ Get buyer cart
//     const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
//     if (!cart || cart.products.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // 2️⃣ Filter out any deleted products
//     const validProducts = cart.products.filter(item => item.product != null);
//     if (validProducts.length === 0) {
//       return res.status(400).json({ message: "Cart has no valid products" });
//     }

//     // 3️⃣ Prepare order products
//     const orderProducts = validProducts.map(item => ({
//       product: item.product._id,
//       seller: item.product.seller, // must exist in Product schema
//       quantity: item.quantity,
//       price: item.product.price
//     }));

//     // 4️⃣ Calculate total amount
//     const totalAmount = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

//     // 5️⃣ Create single order with all products
//     const order = await Order.create({
//       buyer: req.user._id,
//       products: orderProducts,
//       totalAmount,
//       shippingAddress,
//       status: "pending"
//     });

//     // 6️⃣ Clear buyer cart
//     // cart.products = [];
//     // await cart.save();
    
//     // 6️⃣ Delete cart after order (IMPORTANT FIX)
// await Cart.findOneAndDelete({ user: req.user._id });

//     // 7️⃣ Populate product details for response
//     const populatedOrder = await Order.findById(order._id)
//       .populate({
//         path: "products.product",
//         select: "title description price images category seller"
//       })
//       .populate("buyer", "name email");

//     res.status(201).json(populatedOrder);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";

// Create Order (Buyer)
// export const createOrder = async (req, res) => {
//   try {
//     const { shippingAddress } = req.body;

//     // 1️⃣ Get buyer cart
//     const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
//     if (!cart || cart.products.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // 2️⃣ Filter out any deleted products
//     const validProducts = cart.products.filter(item => item.product != null);
//     if (validProducts.length === 0) {
//       return res.status(400).json({ message: "Cart has no valid products" });
//     }

//     // 3️⃣ Prepare order products
//     const orderProducts = validProducts.map(item => ({
//       product: item.product._id,
//       seller: item.product.seller, // must exist in Product schema
//       quantity: item.quantity,
//       price: item.product.price
//     }));

//     // 4️⃣ Calculate total amount
//     const totalAmount = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

//     // 5️⃣ Create single order with all products
//     const order = await Order.create({
//       buyer: req.user._id,
//       products: orderProducts,
//       totalAmount,
//       shippingAddress,
//       status: "pending"
//     });

//     // 6️⃣ Clear buyer cart
//     cart.products = [];
//     await cart.save();

//     // 7️⃣ Populate product details for response
//     const populatedOrder = await Order.findById(order._id)
//       .populate({
//         path: "products.product",
//         select: "title description price images category seller"
//       })
//       .populate("buyer", "name email");

//     res.status(201).json(populatedOrder);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";
// import Product from "../models/Product.js";

// export const createOrder = async (req, res) => {
//   try {
//     const { shippingAddress } = req.body;

//     console.log("👉 USER:", req.user._id);

//     // 1️⃣ Get cart WITHOUT populate
//     const cart = await Cart.findOne({ user: req.user._id });

//     console.log("👉 CART:", cart);

//     if (!cart || cart.products.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // 2️⃣ 🔥 Fetch each product from DB (IMPORTANT FIX)
//     const orderProducts = [];

//     for (let item of cart.products) {
//       const product = await Product.findById(item.product);

//       if (!product) continue;

//       orderProducts.push({
//         product: product._id,
//         seller: product.seller, // ✅ correct seller mapping
//         quantity: item.quantity,
//         price: product.price,
//       });
//     }

//     // 3️⃣ Check again
//     if (orderProducts.length === 0) {
//       return res.status(400).json({ message: "No valid products found" });
//     }

//     // 4️⃣ Calculate total
//     const totalAmount = orderProducts.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     // 5️⃣ Create order
//     const order = await Order.create({
//       buyer: req.user._id,
//       products: orderProducts,
//       totalAmount,
//       shippingAddress,
//       status: "pending",
//     });

//     // 6️⃣ Clear cart
//     cart.products = [];
//     await cart.save();

//     // 7️⃣ Populate response
//     const populatedOrder = await Order.findById(order._id)
//       .populate("buyer", "name email")
//       .populate({
//         path: "products.product",
//         select: "title description price images category seller",
//       });

//     res.status(201).json(populatedOrder);

//   } catch (err) {
//     console.error("❌ ORDER ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";
// import Product from "../models/Product.js";

// // Create Order (Buyer)
// export const createOrder = async (req, res) => {
//   try {
//     const { shippingAddress } = req.body;

//     // 1️⃣ Get buyer cart
//     const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");

//     if (!cart || cart.products.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // 2️⃣ Filter valid products
//     const validProducts = cart.products.filter(item => item.product != null);

//     if (validProducts.length === 0) {
//       return res.status(400).json({ message: "No valid products in cart" });
//     }

//     // 3️⃣ 🔥 ALWAYS fetch product from DB (IMPORTANT FIX)
//     const orderProducts = await Promise.all(
//       validProducts.map(async (item) => {
//         const product = await Product.findById(item.product._id);

//         if (!product) return null;

//         return {
//           product: product._id,
//           seller: product.seller, // ✅ correct seller mapping
//           quantity: item.quantity,
//           price: product.price,
//         };
//       })
//     );

//     // remove nulls if any
//     const filteredOrderProducts = orderProducts.filter(p => p !== null);

//     if (filteredOrderProducts.length === 0) {
//       return res.status(400).json({ message: "Products not found" });
//     }

//     // 4️⃣ Calculate total
//     const totalAmount = filteredOrderProducts.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     // 5️⃣ Create order
//     const order = await Order.create({
//       buyer: req.user._id,
//       products: filteredOrderProducts,
//       totalAmount,
//       shippingAddress,
//       status: "pending",
//     });

//     // 6️⃣ Clear cart
//     cart.products = [];
//     await cart.save();

//     // 7️⃣ Populate for response
//     const populatedOrder = await Order.findById(order._id)
//       .populate({
//         path: "products.product",
//         select: "title description price images category seller",
//       })
//       .populate("buyer", "name email");

//     res.status(201).json(populatedOrder);

//   } catch (err) {
//     console.error("Create Order Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";
// import User from "../models/User.js"; // ✅ ADD THIS

// export const createOrder = async (req, res) => {
//   try {
//     console.log("USER ID:", req.user._id);
//     const { shippingAddress } = req.body;

//     // 1️⃣ Get cart
//     const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");

//     if (!cart || cart.products.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // 2️⃣ Filter valid products
//     const validProducts = cart.products.filter(item => item.product != null);

//     if (validProducts.length === 0) {
//       return res.status(400).json({ message: "Cart has no valid products" });
//     }

//     // 3️⃣ Prepare order products
//     const orderProducts = validProducts.map(item => ({
//       product: item.product._id,
//       seller: item.product.seller,
//       quantity: item.quantity,
//       price: item.product.price
//     }));

//     // 4️⃣ Calculate total
//     const totalAmount = orderProducts.reduce(
//       (sum, p) => sum + p.price * p.quantity,
//       0
//     );

//     // 5️⃣ Create order
//     const order = await Order.create({
//       buyer: req.user._id,
//       products: orderProducts,
//       totalAmount,
//       shippingAddress,
//       status: "pending"
//     });

//     // ✅ 6️⃣ UPDATE SELLER STATS (VERY IMPORTANT)
//     for (const item of orderProducts) {
//       await User.findByIdAndUpdate(item.seller, {
//         $inc: {
//           totalOrders: 1,
//           totalRevenue: item.price * item.quantity
//         }
//       });
//     }

//     // ✅ 7️⃣ DELETE CART (FIXED)
//     await Cart.findOneAndDelete({ user: req.user._id });

//     // 8️⃣ Return order
//     const populatedOrder = await Order.findById(order._id)
//       .populate("buyer", "name email")
//       .populate({
//         path: "products.product",
//         select: "title price images"
//       });

//     res.status(201).json(populatedOrder);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// import mongoose from "mongoose";
// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";
// import User from "../models/User.js";

// export const createOrder = async (req, res) => {
//   try {
//     // 1️⃣ Check logged-in user
//     console.log("REQ USER:", req.user);
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     // 2️⃣ Prepare userId as ObjectId
//     let userId;
//     try {
//       userId = new mongoose.Types.ObjectId(req.user._id);
//     } catch (err) {
//       // fallback if already ObjectId
//       userId = req.user._id;
//     }

//     // 3️⃣ Attempt to find cart using ObjectId
//     let cart = await Cart.findOne({ user: userId }).populate("products.product");

//     // 4️⃣ Fallback: find cart using string _id (for old data)
//     if (!cart) {
//       cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
//     }

//     if (!cart) {
//       return res.status(400).json({ message: "Cart not found for this user", userId: req.user._id });
//     }

//     if (!cart.products || cart.products.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // 5️⃣ Filter valid products
//     const validProducts = cart.products.filter(item => item.product);
//     if (validProducts.length === 0) {
//       return res.status(400).json({ message: "Cart has no valid products" });
//     }

//     // 6️⃣ Prepare order products array
//     const orderProducts = validProducts.map(item => ({
//       product: item.product._id,
//       seller: item.product.seller,
//       quantity: item.quantity,
//       price: item.product.price
//     }));

//     // 7️⃣ Calculate total
//     const totalAmount = orderProducts.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     // 8️⃣ Create the order
//     const order = await Order.create({
//       buyer: userId,
//       products: orderProducts,
//       totalAmount,
//       shippingAddress: req.body.shippingAddress,
//       status: "pending"
//     });

//     // 9️⃣ Update seller stats
//     for (const item of orderProducts) {
//       if (!item.seller) continue;
//       await User.findByIdAndUpdate(item.seller, {
//         $inc: { totalOrders: 1, totalRevenue: item.price * item.quantity }
//       });
//     }

//     // 🔟 Delete the cart after order
//     await Cart.findOneAndDelete({ user: userId });

//     // 1️⃣1️⃣ Populate order for response
//     const populatedOrder = await Order.findById(order._id)
//       .populate("buyer", "name email")
//       .populate({ path: "products.product", select: "title price images" });

//     res.status(201).json(populatedOrder);

//   } catch (err) {
//     console.error("CREATE ORDER ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js"; // For updating seller stats

export const createOrder = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { shippingAddress } = req.body;

    // 1️⃣ Get buyer's cart
    const cart = await Cart.findOne({ user: buyerId }).populate("products.product");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Filter valid products (skip deleted products)
    const validProducts = cart.products.filter(item => item.product != null);
    if (validProducts.length === 0) {
      return res.status(400).json({ message: "Cart has no valid products" });
    }

    // 3️⃣ Prepare order products
    const orderProducts = validProducts.map(item => ({
      product: item.product._id,
      seller: item.product.seller, // MUST exist
      quantity: item.quantity,
      price: item.product.price
    }));

    // 4️⃣ Calculate total order amount
    const totalAmount = orderProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    // 5️⃣ Create the order
    const order = await Order.create({
      buyer: buyerId,
      products: orderProducts,
      totalAmount,
      shippingAddress,
      status: "pending"
    });

    // 6️⃣ Update each seller's stats atomically
    const sellerUpdates = {};

    orderProducts.forEach(item => {
      const sellerId = item.seller.toString();
      if (!sellerUpdates[sellerId]) {
        sellerUpdates[sellerId] = { totalOrders: 0, totalRevenue: 0 };
      }
      sellerUpdates[sellerId].totalOrders += 1; // count 1 order per seller
      sellerUpdates[sellerId].totalRevenue += item.price * item.quantity;
    });

    for (const sellerId in sellerUpdates) {
      await User.findByIdAndUpdate(sellerId, {
        $inc: sellerUpdates[sellerId]
      });
    }

    // 7️⃣ Delete the cart
    await Cart.findOneAndDelete({ user: buyerId });

    // 8️⃣ Return populated order
    const populatedOrder = await Order.findById(order._id)
      .populate("buyer", "name email")
      .populate({
        path: "products.product",
        select: "title price images"
      });

    res.status(201).json(populatedOrder);

  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get Buyer Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate({
        path: "products.product",
        select: "title description price images category seller",
        match: { _id: { $ne: null } } // only non-null products
      })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get Seller Orders
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "products.seller": req.user._id })
      .populate({
        path: "products.product",
        select: "title description price images category seller",
        match: { _id: { $ne: null } } // exclude null products
      })
      .populate("buyer", "name email") // optional: show buyer info
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "name email")
      .populate({
        path: "products.product",
        select: "title price images"
      })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};