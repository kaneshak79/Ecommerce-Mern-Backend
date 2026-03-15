import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import path from "path";
import { errorHandler } from "./middlewares/errorMiddleware.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));