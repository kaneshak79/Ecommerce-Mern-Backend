// // // import Product from "../models/Product.js";
// // // import Store from "../models/Store.js";
// // // import Order from "../models/Order.js";

// // // // Get Seller Products
// // // export const getSellerProducts = async (req, res) => {
// // //   const products = await Product.find({ seller: req.user._id });
// // //   res.json(products);
// // // };

// // // // Update Store Info
// // // export const updateStore = async (req, res) => {
// // //   const store = await Store.findOne({ user: req.user._id });
// // //   if (!store) return res.status(404).json({ message: "Store not found" });
// // //   Object.assign(store, req.body);
// // //   await store.save();
// // //   res.json(store);
// // // };

// // // // Seller Orders


// // // export const getSellerOrders = async (req, res) => {
// // //   const orders = await Order.find().populate("products.product").populate("buyer");

// // //   const sellerOrders = orders
// // //     .map(order => {
// // //       const sellerProducts = order.products.filter(
// // //         item => item.product.seller.toString() === req.user._id.toString()
// // //       );
// // //       if (sellerProducts.length > 0) {
// // //         return {
// // //           ...order.toObject(),
// // //           products: sellerProducts
// // //         };
// // //       }
// // //       return null;
// // //     })
// // //     .filter(Boolean);

// // //   res.json(sellerOrders);
// // // };

// // // // Sales Report


// // // export const getSalesReport = async (req, res) => {
// // //   const orders = await Order.find().populate("products.product");

// // //   let totalRevenue = 0;
// // //   const productsSold = {};

// // //   orders.forEach(order => {
// // //     order.products.forEach(item => {
// // //       if (item.product.seller.toString() === req.user._id.toString()) {
// // //         totalRevenue += item.product.price * item.quantity;

// // //         if (!productsSold[item.product._id]) {
// // //           productsSold[item.product._id] = {
// // //             productId: item.product._id,
// // //             title: item.product.title,
// // //             quantitySold: 0,
// // //             revenue: 0
// // //           };
// // //         }

// // //         productsSold[item.product._id].quantitySold += item.quantity;
// // //         productsSold[item.product._id].revenue += item.product.price * item.quantity;
// // //       }
// // //     });
// // //   });

// // //   res.json({
// // //     totalOrders: Object.values(productsSold).reduce((acc, p) => acc + p.quantitySold, 0),
// // //     totalRevenue,
// // //     productsSold: Object.values(productsSold)
// // //   });
// // // };


// // // export const getSellerDashboard = async (req, res) => {
// // //   try {
// // //     const sellerId = req.user._id;

// // //     // ✅ Count products
// // //     const products = await Product.countDocuments({ seller: sellerId });

// // //     // ✅ Get orders
// // //     const ordersData = await Order.find().populate("products.product");

// // //     let totalOrders = 0;
// // //     let revenue = 0;

// // //     ordersData.forEach((order) => {
// // //       order.products.forEach((item) => {
// // //         if (
// // //           item.product &&
// // //           item.product.seller.toString() === sellerId.toString()
// // //         ) {
// // //           totalOrders += 1;
// // //           revenue += item.product.price * item.quantity;
// // //         }
// // //       });
// // //     });

// // //     res.json({
// // //       products,
// // //       orders: totalOrders,
// // //       revenue,
// // //     });

// // //   } catch (err) {
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // };


// // import Product from "../models/Product.js";
// // import Store from "../models/Store.js";
// // import Order from "../models/Order.js";

// // // export const getSellerDashboard = async (req, res) => {
// // //   try {
// // //     const sellerId = req.user._id;

// // //     // ✅ Products count
// // //     const products = await Product.countDocuments({ seller: sellerId });

// // //     // ✅ Orders
// // //     const orders = await Order.find({
// // //       "products.seller": sellerId,
// // //     });

// // //     let totalOrders = 0;
// // //     let revenue = 0;

// // //     orders.forEach((order) => {
// // //       order.products.forEach((item) => {
// // //         if (item.seller.toString() === sellerId.toString()) {
// // //           totalOrders += 1;
// // //           revenue += item.price * item.quantity;
// // //         }
// // //       });
// // //     });

// // //     res.json({
// // //       products,
// // //       orders: totalOrders,
// // //       revenue,
// // //     });

// // //   } catch (err) {
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // };

// // export const getSellerDashboard = async (req, res) => {
// //   try {
// //     const sellerId = req.user._id;

// //     const productsCount = await Product.countDocuments({ seller: sellerId });

// //     // Get orders containing this seller
// //     const orders = await Order.find({
// //       "products.seller": sellerId,
// //     });

// //     // Revenue sum and distinct orders
// //     let totalRevenue = 0;
// //     let orderIds = new Set();

// //     orders.forEach((order) => {
// //       order.products.forEach((item) => {
// //         if (item.seller.toString() === sellerId.toString()) {
// //           totalRevenue += item.price * item.quantity;
// //           orderIds.add(order._id.toString()); // count each order only once
// //         }
// //       });
// //     });

// //     res.json({
// //       products: productsCount,
// //       orders: orderIds.size,
// //       revenue: totalRevenue,
// //     });

// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // export const getSalesReport = async (req, res) => {
// //   try {
// //     const sellerId = req.user._id;

// //     const orders = await Order.find({
// //       "products.seller": sellerId,
// //     });

// //     let totalRevenue = 0;
// //     let totalOrders = 0;
// //     const productsSold = {};

// //     orders.forEach((order) => {
// //       order.products.forEach((item) => {

// //         if (item.seller.toString() === sellerId.toString()) {

// //           totalRevenue += item.price * item.quantity;
// //           totalOrders += 1;

// //           if (!productsSold[item.product]) {
// //             productsSold[item.product] = {
// //               productId: item.product,
// //               quantitySold: 0,
// //               revenue: 0,
// //             };
// //           }

// //           productsSold[item.product].quantitySold += item.quantity;
// //           productsSold[item.product].revenue += item.price * item.quantity;
// //         }
// //       });
// //     });

// //     res.json({
// //       totalOrders,
// //       totalRevenue,
// //       productsSold: Object.values(productsSold),
// //     });

// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// // // Update Store Info
// // export const updateStore = async (req, res) => {
// //   try {
// //     const sellerId = req.user._id;

// //     let store = await Store.findOne({ user: sellerId });

// //     // 👉 If store doesn't exist → create one
// //     if (!store) {
// //       store = await Store.create({
// //         user: sellerId,
// //         name: req.body.name || "My Store",
// //         description: req.body.description || "",
// //         location: req.body.location || "",
// //         contactEmail: req.body.contactEmail || "",
// //         contactPhone: req.body.contactPhone || "",
// //       });

// //       return res.status(201).json(store);
// //     }

// //     // 👉 Update existing store
// //     store.name = req.body.name || store.name;
// //     store.description = req.body.description || store.description;
// //     store.location = req.body.location || store.location;
// //     store.contactEmail = req.body.contactEmail || store.contactEmail;
// //     store.contactPhone = req.body.contactPhone || store.contactPhone;

// //     await store.save();

// //     res.json(store);

// //   } catch (err) {
// //     res.status(500).json({ message: "Error updating store" });
// //   }
// // };



// // // Get Seller Products
// // export const getSellerProducts = async (req, res) => {
// //   try {
// //     const sellerId = req.user._id;

// //     const products = await Product.find({ seller: sellerId }).sort({ createdAt: -1 });

// //     res.json(products);

// //   } catch (err) {
// //     res.status(500).json({ message: "Error fetching seller products" });
// //   }
// // };


// // // Get Seller Orders
// // export const getSellerOrders = async (req, res) => {
// //   try {
// //     const sellerId = req.user._id;

// //     // ✅ Get only orders containing this seller
// //     const orders = await Order.find({
// //       "products.seller": sellerId,
// //     }).populate("buyer");

// //     // ✅ Filter only this seller's products inside each order
// //     const sellerOrders = orders.map((order) => {
// //       const filteredProducts = order.products.filter(
// //         (item) => item.seller.toString() === sellerId.toString()
// //       );

// //       return {
// //         _id: order._id,
// //         buyer: order.buyer,
// //         products: filteredProducts,
// //         totalAmount: order.totalAmount,
// //         shippingAddress: order.shippingAddress,
// //         status: order.status,
// //         createdAt: order.createdAt,
// //       };
// //     });

// //     res.json(sellerOrders);

// //   } catch (err) {
// //     res.status(500).json({ message: "Error fetching seller orders" });
// //   }
// // };



// import Product from "../models/Product.js";
// import Store from "../models/Store.js";
// import Order from "../models/Order.js";
// import mongoose from "mongoose";

// // ----------------------
// // Seller Dashboard
// // ----------------------
// export const getSellerDashboard = async (req, res) => {
//   try {
//     const sellerId = req.user._id;

//     // ✅ Count products created by this seller
//     const productsCount = await Product.countDocuments({ seller: sellerId });

//     // ✅ Get all orders containing at least one product of this seller
//     const orders = await Order.find({ "products.seller": sellerId });

//     let totalRevenue = 0;
//     const orderIds = new Set();

//     orders.forEach((order) => {
//       order.products.forEach((item) => {
//         if (item.seller.toString() === sellerId.toString()) {
//           totalRevenue += item.price * item.quantity;
//           orderIds.add(order._id.toString()); // count distinct orders
//         }
//       });
//     });

//     res.json({
//       products: productsCount,
//       orders: orderIds.size,
//       revenue: totalRevenue,
//     });

//   } catch (err) {
//     console.error("Dashboard error:", err);
//     res.status(500).json({ message: "Error fetching dashboard" });
//   }
// };

// // ----------------------
// // Seller Sales Report
// // ----------------------
// export const getSalesReport = async (req, res) => {
//   try {
//     const sellerId = req.user._id;

//     // Get orders containing this seller's products
//     const orders = await Order.find({ "products.seller": sellerId });

//     let totalRevenue = 0;
//     const orderIds = new Set();
//     const productsSold = {};

//     orders.forEach((order) => {
//       order.products.forEach((item) => {
//         if (item.seller.toString() === sellerId.toString()) {
//           totalRevenue += item.price * item.quantity;
//           orderIds.add(order._id.toString());

//           // Track revenue and quantity per product
//           const pid = item.product.toString();
//           if (!productsSold[pid]) {
//             productsSold[pid] = {
//               productId: item.product,
//               quantitySold: 0,
//               revenue: 0,
//             };
//           }
//           productsSold[pid].quantitySold += item.quantity;
//           productsSold[pid].revenue += item.price * item.quantity;
//         }
//       });
//     });

//     res.json({
//       totalOrders: orderIds.size,
//       totalRevenue,
//       productsSold: Object.values(productsSold),
//     });

//   } catch (err) {
//     console.error("Sales report error:", err);
//     res.status(500).json({ message: "Error fetching sales report" });
//   }
// };

// // ----------------------
// // Update Store Info
// // ----------------------
// export const updateStore = async (req, res) => {
//   try {
//     const sellerId = req.user._id;
//     let store = await Store.findOne({ user: sellerId });

//     // If store doesn't exist → create
//     if (!store) {
//       store = await Store.create({
//         user: sellerId,
//         name: req.body.name || "My Store",
//         description: req.body.description || "",
//         location: req.body.location || "",
//         contactEmail: req.body.contactEmail || "",
//         contactPhone: req.body.contactPhone || "",
//       });
//       return res.status(201).json(store);
//     }

//     // Update existing store
//     store.name = req.body.name || store.name;
//     store.description = req.body.description || store.description;
//     store.location = req.body.location || store.location;
//     store.contactEmail = req.body.contactEmail || store.contactEmail;
//     store.contactPhone = req.body.contactPhone || store.contactPhone;

//     await store.save();
//     res.json(store);

//   } catch (err) {
//     console.error("Update store error:", err);
//     res.status(500).json({ message: "Error updating store" });
//   }
// };

// // ----------------------
// // Get Seller Products
// // ----------------------
// export const getSellerProducts = async (req, res) => {
//   try {
//     const sellerId = req.user._id;
//     const products = await Product.find({ seller: sellerId }).sort({ createdAt: -1 });
//     res.json(products);
//   } catch (err) {
//     console.error("Get seller products error:", err);
//     res.status(500).json({ message: "Error fetching seller products" });
//   }
// };

// // ----------------------
// // Get Seller Orders
// // ----------------------
// export const getSellerOrders = async (req, res) => {
//   try {
//     const sellerId = req.user._id;

//     // Orders containing this seller's products
//     const orders = await Order.find({ "products.seller": sellerId }).populate("buyer", "name email");

//     // Filter products in each order to include only this seller's items
//     const sellerOrders = orders.map((order) => {
//       const filteredProducts = order.products.filter(
//         (item) => item.seller.toString() === sellerId.toString()
//       );

//       return {
//         _id: order._id,
//         buyer: order.buyer,
//         products: filteredProducts,
//         totalAmount: filteredProducts.reduce((sum, p) => sum + p.price * p.quantity, 0),
//         shippingAddress: order.shippingAddress,
//         status: order.status,
//         createdAt: order.createdAt,
//       };
//     });

//     res.json(sellerOrders);

//   } catch (err) {
//     console.error("Get seller orders error:", err);
//     res.status(500).json({ message: "Error fetching seller orders" });
//   }
// };


import Product from "../models/Product.js";
import Store from "../models/Store.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

// ----------------------
// Seller Dashboard
// ----------------------
// export const getSellerDashboard = async (req, res) => {
//   try {
//     const sellerId = req.user._id;

//     const productsCount = await Product.countDocuments({ seller: sellerId });
//     const orders = await Order.find({ "products.seller": sellerId });

//     let totalRevenue = 0;
//     const orderIds = new Set();

//     orders.forEach(order => {
//       order.products.forEach(item => {
//         if (item.seller.toString() === sellerId.toString()) {
//           totalRevenue += item.price * item.quantity;
//           orderIds.add(order._id.toString());
//         }
//       });
//     });

//     res.json({
//       products: productsCount,
//       orders: orderIds.size,
//       revenue: totalRevenue
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching dashboard" });
//   }
// };

// export const getSellerDashboard = async (req, res) => {
//   try {
//     const sellerId = req.user._id;

//     // Count products created by seller
//     const productsCount = await Product.countDocuments({ seller: sellerId });

//     // Get all orders that include seller's products
//     const orders = await Order.find({ "products.seller": sellerId })
//       .sort({ createdAt: -1 })
//       .limit(50); // limit to latest 50 orders for performance

//     let totalRevenue = 0;
//     const orderIds = new Set();

//     // Prepare recentOrders array
//     const recentOrders = [];

//     // Prepare salesByDate map
//     const salesMap = {}; // { '2026-03-19': { orders: 2, revenue: 100 } }

//     orders.forEach(order => {
//       let sellerOrderTotal = 0;
//       let sellerProductsInOrder = [];

//       order.products.forEach(item => {
//         if (item.seller.toString() === sellerId.toString()) {
//           const itemTotal = item.price * item.quantity;
//           totalRevenue += itemTotal;
//           sellerOrderTotal += itemTotal;
//           sellerProductsInOrder.push({
//             productName: item.product?.title || "Unknown Product",
//             quantity: item.quantity,
//             price: item.price
//           });
//         }
//       });

//       if (sellerProductsInOrder.length > 0) {
//         orderIds.add(order._id.toString());

//         // Add to recentOrders
//         recentOrders.push({
//           _id: order._id,
//           buyerName: order.buyer.name,
//           status: order.status,
//           date: order.createdAt.toISOString().split("T")[0],
//           products: sellerProductsInOrder
//         });

//         // Add to salesMap by date
//         const dateKey = order.createdAt.toISOString().split("T")[0];
//         if (!salesMap[dateKey]) salesMap[dateKey] = { orders: 0, revenue: 0 };
//         salesMap[dateKey].orders += 1;
//         salesMap[dateKey].revenue += sellerOrderTotal;
//       }
//     });

//     // Convert salesMap to array for frontend chart
//     const salesByDate = Object.keys(salesMap)
//       .sort() // sort by date ascending
//       .map(date => ({
//         date,
//         orders: salesMap[date].orders,
//         revenue: salesMap[date].revenue
//       }));

//     res.json({
//       products: productsCount,
//       orders: orderIds.size,
//       revenue: totalRevenue,
//       salesByDate,
//       recentOrders
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching dashboard" });
//   }
// };


// controllers/sellerController.js

// import Product from "../models/Product.js";
// import Order from "../models/Order.js";

export const getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // 1️⃣ Count products created by this seller
    const productsCount = await Product.countDocuments({ seller: sellerId });

    // 2️⃣ Get all orders containing this seller's products, populate product title
    const orders = await Order.find({ "products.seller": sellerId })
      .populate("products.product", "title") // populate product title
      .sort({ createdAt: -1 })
      .limit(50); // latest 50 orders for dashboard

    let totalRevenue = 0;
    const orderIds = new Set();

    // 3️⃣ Prepare recentOrders array
    const recentOrders = [];

    // 4️⃣ Prepare salesByDate map
    const salesMap = {}; // { '2026-03-19': { orders: 2, revenue: 100 } }

    orders.forEach(order => {
      let sellerOrderTotal = 0;
      let sellerProductsInOrder = [];

    //   order.products.forEach(item => {
    //     if (item.seller.toString() === sellerId.toString()) {
    //       const itemTotal = item.price * item.quantity;
    //       totalRevenue += itemTotal;
    //       sellerOrderTotal += itemTotal;

    //       sellerProductsInOrder.push({
    //         productName: item.product?.title || "Unknown Product",
    //         quantity: item.quantity,
    //         price: item.price
    //       });
    //     }
    //   });
    order.products.forEach(item => {
  if (item.seller.toString() === sellerId.toString()) {
    const itemTotal = item.price * item.quantity;
    totalRevenue += itemTotal;
    sellerOrderTotal += itemTotal;

    sellerProductsInOrder.push({
      _id: item._id, // ✅ REQUIRED
      productName: item.product?.title || "Unknown Product",
      quantity: item.quantity,
      price: item.price,
      status: item.status // ✅ important for frontend
    });
  }
});

      if (sellerProductsInOrder.length > 0) {
        orderIds.add(order._id.toString());

        // Add to recentOrders
        recentOrders.push({
          _id: order._id,
          buyerName: order.buyer.name,
          status: order.status,
          date: order.createdAt.toISOString().split("T")[0],
          products: sellerProductsInOrder
        });

        // Add to salesMap by date
        const dateKey = order.createdAt.toISOString().split("T")[0];
        if (!salesMap[dateKey]) salesMap[dateKey] = { orders: 0, revenue: 0 };
        salesMap[dateKey].orders += 1;
        salesMap[dateKey].revenue += sellerOrderTotal;
      }
    });

    // Convert salesMap to sorted array for frontend chart
    const salesByDate = Object.keys(salesMap)
      .sort()
      .map(date => ({
        date,
        orders: salesMap[date].orders,
        revenue: salesMap[date].revenue
      }));

    // 5️⃣ Return dashboard JSON
    res.json({
      products: productsCount,
      orders: orderIds.size,
      revenue: totalRevenue,
      salesByDate,
      recentOrders
    });

  } catch (err) {
    console.error("Error fetching seller dashboard:", err);
    res.status(500).json({ message: "Error fetching dashboard" });
  }
};

// ----------------------
// Seller Sales Report
// ----------------------
export const getSalesReport = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const orders = await Order.find({ "products.seller": sellerId });

    let totalRevenue = 0;
    const orderIds = new Set();
    const productsSold = {};

    orders.forEach(order => {
      order.products.forEach(item => {
        if (item.seller.toString() === sellerId.toString()) {
          totalRevenue += item.price * item.quantity;
          orderIds.add(order._id.toString());

          const pid = item.product.toString();
          if (!productsSold[pid]) {
            productsSold[pid] = { productId: item.product, quantitySold: 0, revenue: 0 };
          }
          productsSold[pid].quantitySold += item.quantity;
          productsSold[pid].revenue += item.price * item.quantity;
        }
      });
    });

    res.json({
      totalOrders: orderIds.size,
      totalRevenue,
      productsSold: Object.values(productsSold)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching sales report" });
  }
};

// ----------------------
// Update Store
// ----------------------
export const updateStore = async (req, res) => {
  try {
    const sellerId = req.user._id;
    let store = await Store.findOne({ user: sellerId });

    if (!store) {
      store = await Store.create({
        user: sellerId,
        name: req.body.name || "My Store",
        description: req.body.description || "",
        location: req.body.location || "",
        contactEmail: req.body.contactEmail || "",
        contactPhone: req.body.contactPhone || ""
      });
      return res.status(201).json(store);
    }

    store.name = req.body.name || store.name;
    store.description = req.body.description || store.description;
    store.location = req.body.location || store.location;
    store.contactEmail = req.body.contactEmail || store.contactEmail;
    store.contactPhone = req.body.contactPhone || store.contactPhone;

    await store.save();
    res.json(store);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating store" });
  }
};

// ----------------------
// Get Seller Products
// ----------------------
export const getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const products = await Product.find({ seller: sellerId }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching seller products" });
  }
};

// ----------------------
// Get Seller Orders
// ----------------------
// export const getSellerOrders = async (req, res) => {
//   try {
//     const sellerId = req.user._id;
//     const orders = await Order.find({ "products.seller": sellerId }).populate("buyer", "name email");

//     const sellerOrders = orders.map(order => {
//       const filteredProducts = order.products.filter(item => item.seller.toString() === sellerId.toString());
//       return {
//         _id: order._id,
//         buyer: order.buyer,
//         products: filteredProducts,
//         totalAmount: filteredProducts.reduce((sum, p) => sum + p.price * p.quantity, 0),
//         shippingAddress: order.shippingAddress,
//         status: order.status,
//         createdAt: order.createdAt
//       };
//     });

//     res.json(sellerOrders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching seller orders" });
//   }
// };

// controllers/orderController.js
// import Order from "../models/Order.js";

export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Find orders that have at least one product by this seller
    const orders = await Order.find({ "products.seller": sellerId })
      .populate({
        path: "products.product",        // Populate the product object
        select: "title price images",    // Only fetch these fields
        match: { _id: { $ne: null } }   // Exclude deleted products
      })
      .populate("buyer", "name email")   // Include buyer info
      .sort({ createdAt: -1 });         // Latest orders first

    // Map orders to include only this seller's products
    const filteredOrders = orders.map(order => {
      const sellerProducts = order.products.filter(
        item => item.seller.toString() === sellerId.toString()
      );

      return {
        _id: order._id,
        buyer: order.buyer,
        status: order.status,
        date: order.createdAt,
        products: sellerProducts,
        totalAmount: sellerProducts.reduce((sum, i) => sum + i.price * i.quantity, 0),
        shippingAddress: order.shippingAddress
      };
    });

    res.json(filteredOrders);
  } catch (err) {
    console.error("Get Seller Orders Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// controllers/sellerController.js
// import Order from "../models/Order.js";

// // Update order status for a specific product of the logged-in seller
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const sellerId = req.user._id; // logged-in seller
//     const { orderId, productId } = req.params;
//     const { status } = req.body; // new status e.g., "pending", "shipped", "delivered"

//     // Find the order
//     const order = await Order.findById(orderId);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // Find the product in this order that belongs to this seller
//     const productItem = order.products.find(
//       (p) => p._id.toString() === productId && p.seller.toString() === sellerId.toString()
//     );

//     if (!productItem) return res.status(403).json({ message: "Access denied: not your product" });

//     // Update status
//     productItem.status = status;
//     await order.save();

//     res.json({
//       message: "Product status updated successfully",
//       orderId,
//       product: {
//         _id: productItem._id,
//         productName: productItem.productName,
//         status: productItem.status,
//       },
//     });
//   } catch (err) {
//     console.error("Error updating order status:", err);
//     res.status(500).json({ message: "Error updating order status" });
//   }
// };

// // Update order status for a specific product of the logged-in seller
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const sellerId = req.user._id; // logged-in seller
//     const { orderId, productId } = req.params;
//     const { status } = req.body; // new status e.g., "pending", "shipped", "delivered"

//     // Find the order
//     const order = await Order.findById(orderId);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // Find the product in this order that belongs to this seller
//     const productItem = order.products.find(
//       (p) => p._id.toString() === productId && p.seller.toString() === sellerId.toString()
//     );

//     if (!productItem) return res.status(403).json({ message: "Access denied: not your product" });

//     // Update status
//     productItem.status = status;
//     await order.save();

//     res.json({
//       message: "Product status updated successfully",
//       orderId,
//       product: {
//         _id: productItem._id,
//         productName: productItem.productName,
//         status: productItem.status,
//       },
//     });
//   } catch (err) {
//     console.error("Error updating order status:", err);
//     res.status(500).json({ message: "Error updating order status" });
//   }
// };


export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params; // e.g., /orders/:orderId
  const { status } = req.body;    // new status: "Shipped", "Delivered", etc.

  try {
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Update main order status
    order.status = status;

    // Update per-product status
    order.products.forEach((p) => {
      p.status = status;
    });

    const updatedOrder = await order.save();

    res.json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



// GET /seller/products/:id
export const getSellerProductById = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const product = await Product.findOne({ _id: req.params.id, seller: sellerId });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("Get product by ID error:", err);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// controllers/sellerController.js
export const updateSellerProduct = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { id } = req.params;

    // Find product belonging to this seller
    const product = await Product.findOne({ _id: id, seller: sellerId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update fields
    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;

    // Update image if uploaded
    if (req.file) {
      product.images = [req.file.path]; // make sure multer saves path correctly
    }

    await product.save();

    res.json(product);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
};


// controllers/sellerController.js
// import Product from "../models/Product.js";

// DELETE /seller/products/:id
export const deleteSellerProduct = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { id } = req.params;

    // Find product belonging to this seller
    const product = await Product.findOne({ _id: id, seller: sellerId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne(); // remove product from DB

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};