import Product from "../models/Product.js";

// Add Product (Seller only)
export const addProduct = async (req, res) => {
  const { title, description, price, quantity, category, images } = req.body;
  const product = await Product.create({
    seller: req.user._id,
    title, description, price, quantity, category, images
  });
  res.status(201).json(product);
};

// Get All Products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get Product by ID
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// Update Product
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (!product.seller.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

  Object.assign(product, req.body);
  await product.save();
  res.json(product);
};

// Delete Product
// export const deleteProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) return res.status(404).json({ message: "Product not found" });
//   if (!product.seller.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

//   await product.remove();
//   res.json({ message: "Product removed" });
// };

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!product.seller.equals(req.user._id))
      return res.status(403).json({ message: "Not authorized" });

    // Use deleteOne() instead of remove()
    await product.deleteOne();

    res.json({ message: "Product removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search Product
export const searchProduct = async (req, res) => {
  const { query } = req.query;
  const products = await Product.find({ title: { $regex: query, $options: "i" } });
  res.json(products);
};

// Filter by Category
export const filterByCategory = async (req, res) => {
  const { category } = req.query;
  const products = await Product.find({ category });
  res.json(products);
};

// Filter by Price
export const filterByPrice = async (req, res) => {
  const { min, max } = req.query;
  const products = await Product.find({ price: { $gte: min || 0, $lte: max || Infinity } });
  res.json(products);
};

// Combined Filter
export const filterProducts = async (req, res) => {
  const { category, min, max } = req.query;
  const query = {};
  if (category) query.category = category;
  query.price = { $gte: min || 0, $lte: max || Infinity };
  const products = await Product.find(query);
  res.json(products);
};