// import Product from "../models/Product.js";
// import Store from "../models/Store.js";
// import Order from "../models/Order.js";

// // Get Seller Products
// export const getSellerProducts = async (req, res) => {
//   const products = await Product.find({ seller: req.user._id });
//   res.json(products);
// };

// // Update Store Info
// export const updateStore = async (req, res) => {
//   const store = await Store.findOne({ user: req.user._id });
//   if (!store) return res.status(404).json({ message: "Store not found" });
//   Object.assign(store, req.body);
//   await store.save();
//   res.json(store);
// };

// // Seller Orders


// export const getSellerOrders = async (req, res) => {
//   const orders = await Order.find().populate("products.product").populate("buyer");

//   const sellerOrders = orders
//     .map(order => {
//       const sellerProducts = order.products.filter(
//         item => item.product.seller.toString() === req.user._id.toString()
//       );
//       if (sellerProducts.length > 0) {
//         return {
//           ...order.toObject(),
//           products: sellerProducts
//         };
//       }
//       return null;
//     })
//     .filter(Boolean);

//   res.json(sellerOrders);
// };

// // Sales Report


// export const getSalesReport = async (req, res) => {
//   const orders = await Order.find().populate("products.product");

//   let totalRevenue = 0;
//   const productsSold = {};

//   orders.forEach(order => {
//     order.products.forEach(item => {
//       if (item.product.seller.toString() === req.user._id.toString()) {
//         totalRevenue += item.product.price * item.quantity;

//         if (!productsSold[item.product._id]) {
//           productsSold[item.product._id] = {
//             productId: item.product._id,
//             title: item.product.title,
//             quantitySold: 0,
//             revenue: 0
//           };
//         }

//         productsSold[item.product._id].quantitySold += item.quantity;
//         productsSold[item.product._id].revenue += item.product.price * item.quantity;
//       }
//     });
//   });

//   res.json({
//     totalOrders: Object.values(productsSold).reduce((acc, p) => acc + p.quantitySold, 0),
//     totalRevenue,
//     productsSold: Object.values(productsSold)
//   });
// };


// export const getSellerDashboard = async (req, res) => {
//   try {
//     const sellerId = req.user._id;

//     // ✅ Count products
//     const products = await Product.countDocuments({ seller: sellerId });

//     // ✅ Get orders
//     const ordersData = await Order.find().populate("products.product");

//     let totalOrders = 0;
//     let revenue = 0;

//     ordersData.forEach((order) => {
//       order.products.forEach((item) => {
//         if (
//           item.product &&
//           item.product.seller.toString() === sellerId.toString()
//         ) {
//           totalOrders += 1;
//           revenue += item.product.price * item.quantity;
//         }
//       });
//     });

//     res.json({
//       products,
//       orders: totalOrders,
//       revenue,
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


import Product from "../models/Product.js";
import Store from "../models/Store.js";
import Order from "../models/Order.js";

export const getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // ✅ Products count
    const products = await Product.countDocuments({ seller: sellerId });

    // ✅ Orders
    const orders = await Order.find({
      "products.seller": sellerId,
    });

    let totalOrders = 0;
    let revenue = 0;

    orders.forEach((order) => {
      order.products.forEach((item) => {
        if (item.seller.toString() === sellerId.toString()) {
          totalOrders += 1;
          revenue += item.price * item.quantity;
        }
      });
    });

    res.json({
      products,
      orders: totalOrders,
      revenue,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getSalesReport = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const orders = await Order.find({
      "products.seller": sellerId,
    });

    let totalRevenue = 0;
    let totalOrders = 0;
    const productsSold = {};

    orders.forEach((order) => {
      order.products.forEach((item) => {

        if (item.seller.toString() === sellerId.toString()) {

          totalRevenue += item.price * item.quantity;
          totalOrders += 1;

          if (!productsSold[item.product]) {
            productsSold[item.product] = {
              productId: item.product,
              quantitySold: 0,
              revenue: 0,
            };
          }

          productsSold[item.product].quantitySold += item.quantity;
          productsSold[item.product].revenue += item.price * item.quantity;
        }
      });
    });

    res.json({
      totalOrders,
      totalRevenue,
      productsSold: Object.values(productsSold),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update Store Info
export const updateStore = async (req, res) => {
  try {
    const sellerId = req.user._id;

    let store = await Store.findOne({ user: sellerId });

    // 👉 If store doesn't exist → create one
    if (!store) {
      store = await Store.create({
        user: sellerId,
        name: req.body.name || "My Store",
        description: req.body.description || "",
        location: req.body.location || "",
        contactEmail: req.body.contactEmail || "",
        contactPhone: req.body.contactPhone || "",
      });

      return res.status(201).json(store);
    }

    // 👉 Update existing store
    store.name = req.body.name || store.name;
    store.description = req.body.description || store.description;
    store.location = req.body.location || store.location;
    store.contactEmail = req.body.contactEmail || store.contactEmail;
    store.contactPhone = req.body.contactPhone || store.contactPhone;

    await store.save();

    res.json(store);

  } catch (err) {
    res.status(500).json({ message: "Error updating store" });
  }
};



// Get Seller Products
export const getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const products = await Product.find({ seller: sellerId }).sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {
    res.status(500).json({ message: "Error fetching seller products" });
  }
};


// Get Seller Orders
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // ✅ Get only orders containing this seller
    const orders = await Order.find({
      "products.seller": sellerId,
    }).populate("buyer");

    // ✅ Filter only this seller's products inside each order
    const sellerOrders = orders.map((order) => {
      const filteredProducts = order.products.filter(
        (item) => item.seller.toString() === sellerId.toString()
      );

      return {
        _id: order._id,
        buyer: order.buyer,
        products: filteredProducts,
        totalAmount: order.totalAmount,
        shippingAddress: order.shippingAddress,
        status: order.status,
        createdAt: order.createdAt,
      };
    });

    res.json(sellerOrders);

  } catch (err) {
    res.status(500).json({ message: "Error fetching seller orders" });
  }
};