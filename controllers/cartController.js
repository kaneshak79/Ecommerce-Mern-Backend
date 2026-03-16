


import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Ensure product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find cart or create
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, products: [] });

    // Check if product already in cart
    const itemIndex = cart.products.findIndex(p => p.product.equals(productId));
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    // Return cart with populated product details
    const populatedCart = await Cart.findById(cart._id).populate({
      path: "products.product",
      select: "title description price images category",
    });

    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "products.product",
      select: "title description price images category",
    });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Cart
export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.products.findIndex(p => p.product.equals(productId));
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity = quantity;
      await cart.save();
    } else {
      return res.status(404).json({ message: "Product not in cart" });
    }

    // Return updated cart with populated product details
    const populatedCart = await Cart.findById(cart._id).populate({
      path: "products.product",
      select: "title description price images category",
    });

    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete from Cart
export const deleteFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => !p.product.equals(productId));
    await cart.save();

    // Return cart with populated product details
    const populatedCart = await Cart.findById(cart._id).populate({
      path: "products.product",
      select: "title description price images category",
    });

    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};