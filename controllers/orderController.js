


import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Create Order (Buyer)
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    // 1️⃣ Get buyer cart
    const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Filter out any deleted products
    const validProducts = cart.products.filter(item => item.product != null);
    if (validProducts.length === 0) {
      return res.status(400).json({ message: "Cart has no valid products" });
    }

    // 3️⃣ Prepare order products
    const orderProducts = validProducts.map(item => ({
      product: item.product._id,
      seller: item.product.seller, // must exist in Product schema
      quantity: item.quantity,
      price: item.product.price
    }));

    // 4️⃣ Calculate total amount
    const totalAmount = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    // 5️⃣ Create single order with all products
    const order = await Order.create({
      buyer: req.user._id,
      products: orderProducts,
      totalAmount,
      shippingAddress,
      status: "pending"
    });

    // 6️⃣ Clear buyer cart
    cart.products = [];
    await cart.save();

    // 7️⃣ Populate product details for response
    const populatedOrder = await Order.findById(order._id)
      .populate({
        path: "products.product",
        select: "title description price images category seller"
      })
      .populate("buyer", "name email");

    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error(err);
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