import express from "express";
import {
  addProduct, getAllProducts, getProductById, updateProduct, deleteProduct,
  searchProduct, filterByCategory, filterByPrice, filterProducts
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/search", searchProduct);
router.get("/filter/category", filterByCategory);
router.get("/filter/price", filterByPrice);
router.get("/filter/combined", filterProducts);
router.get("/:id", getProductById);

router.post("/", protect, authorizeRoles("seller"), addProduct);
router.put("/:id", protect, authorizeRoles("seller"), updateProduct);
router.delete("/:id", protect, authorizeRoles("seller"), deleteProduct);

export default router;