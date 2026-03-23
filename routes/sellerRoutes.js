// import express from "express";
// import { protect } from "../middlewares/authMiddleware.js";
// import { authorizeRoles } from "../middlewares/roleMiddleware.js";
// import {  getSellerProducts, updateStore, getSellerOrders, getSalesReport,getSellerDashboard } from "../controllers/sellerController.js";

// const router = express.Router();

// router.get("/products", protect, authorizeRoles("seller"), getSellerProducts);
// router.put("/store", protect, authorizeRoles("seller"), updateStore);
// router.get("/orders", protect, authorizeRoles("seller"), getSellerOrders);
// router.get("/sales", protect, authorizeRoles("seller"), getSalesReport);
// router.get("/dashboard", protect, getSellerDashboard);

// export default router;




import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {
    updateOrderStatus,
  getSellerProducts,
  updateStore,
  getSellerOrders,
  getSalesReport,
  getSellerDashboard,
  getSellerProductById,
  updateSellerProduct,
  deleteSellerProduct
} from "../controllers/sellerController.js";

const router = express.Router();

router.get("/products", protect, authorizeRoles("seller"), getSellerProducts);

router.put("/store", protect, authorizeRoles("seller"), updateStore);

router.get("/orders", protect, authorizeRoles("seller"), getSellerOrders);

router.get("/sales", protect, authorizeRoles("seller"), getSalesReport);

router.get("/dashboard", protect, authorizeRoles("seller"), getSellerDashboard);

// PATCH route to update status of a specific product in an order
router.patch(
  "/orders/:orderId/product/:productId",
  protect,                 // must be logged in
  authorizeRoles("seller"), // must be a seller
  updateOrderStatus         // controller we wrote
);

// 🔹 Add this for single product fetch
router.get("/products/:id", protect, authorizeRoles("seller"), getSellerProductById);

router.put(
  "/products/:id",
  protect,
  authorizeRoles("seller"),
  updateSellerProduct
);

// Delete product
router.delete("/products/:id", protect, authorizeRoles("seller"), deleteSellerProduct);

export default router;