
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
// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ buyer: req.user._id })
//       .populate({
//         path: "products.product",
//         select: "title description price images category seller",
//         match: { _id: { $ne: null } } // only non-null products
//       })
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate({
        path: "products.product",
        select: "title description price images category seller"
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

