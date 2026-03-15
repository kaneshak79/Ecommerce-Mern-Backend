import Product from "../models/Product.js";
import Store from "../models/Store.js";
import Order from "../models/Order.js";

// Get Seller Products
export const getSellerProducts = async (req, res) => {
  const products = await Product.find({ seller: req.user._id });
  res.json(products);
};

// Update Store Info
export const updateStore = async (req, res) => {
  const store = await Store.findOne({ user: req.user._id });
  if (!store) return res.status(404).json({ message: "Store not found" });
  Object.assign(store, req.body);
  await store.save();
  res.json(store);
};

// Seller Orders
// export const getSellerOrders = async (req, res) => {
//   const orders = await Order.find({ seller: req.user._id }).populate("products.product");
//   res.json(orders);
// };
// export const getSellerOrders = async (req, res) => {
//   try {
//     // 1️⃣ Get all orders
//     const orders = await Order.find().populate("products.product").populate("buyer");

//     // 2️⃣ Filter orders to include only products belonging to this seller
//     const sellerOrders = orders
//       .map(order => {
//         const sellerProducts = order.products.filter(
//           item => item.product.seller.toString() === req.user._id.toString()
//         );
//         if (sellerProducts.length > 0) {
//           return {
//             ...order.toObject(),
//             products: sellerProducts
//           };
//         } else return null;
//       })
//       .filter(Boolean); // remove nulls

//     res.json(sellerOrders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getSellerOrders = async (req, res) => {
  const orders = await Order.find().populate("products.product").populate("buyer");

  const sellerOrders = orders
    .map(order => {
      const sellerProducts = order.products.filter(
        item => item.product.seller.toString() === req.user._id.toString()
      );
      if (sellerProducts.length > 0) {
        return {
          ...order.toObject(),
          products: sellerProducts
        };
      }
      return null;
    })
    .filter(Boolean);

  res.json(sellerOrders);
};

// Sales Report
// export const salesReport = async (req, res) => {
//   const orders = await Order.find({ seller: req.user._id });
//   const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);
//   res.json({ totalSales, totalOrders: orders.length, orders });
// };

export const getSalesReport = async (req, res) => {
  const orders = await Order.find().populate("products.product");

  let totalRevenue = 0;
  const productsSold = {};

  orders.forEach(order => {
    order.products.forEach(item => {
      if (item.product.seller.toString() === req.user._id.toString()) {
        totalRevenue += item.product.price * item.quantity;

        if (!productsSold[item.product._id]) {
          productsSold[item.product._id] = {
            productId: item.product._id,
            title: item.product.title,
            quantitySold: 0,
            revenue: 0
          };
        }

        productsSold[item.product._id].quantitySold += item.quantity;
        productsSold[item.product._id].revenue += item.product.price * item.quantity;
      }
    });
  });

  res.json({
    totalOrders: Object.values(productsSold).reduce((acc, p) => acc + p.quantitySold, 0),
    totalRevenue,
    productsSold: Object.values(productsSold)
  });
};