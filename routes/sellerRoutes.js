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
  getSellerProducts,
  updateStore,
  getSellerOrders,
  getSalesReport,
  getSellerDashboard
} from "../controllers/sellerController.js";

const router = express.Router();

router.get("/products", protect, authorizeRoles("seller"), getSellerProducts);

router.put("/store", protect, authorizeRoles("seller"), updateStore);

router.get("/orders", protect, authorizeRoles("seller"), getSellerOrders);

router.get("/sales", protect, authorizeRoles("seller"), getSalesReport);

router.get("/dashboard", protect, authorizeRoles("seller"), getSellerDashboard);

export default router;