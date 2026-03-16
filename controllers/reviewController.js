



import Review from "../models/Review.js";

// Add Review
export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const existingReview = await Review.findOne({ product: productId, user: req.user._id });
    if (existingReview) return res.status(400).json({ message: "You already reviewed this product" });

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Reviews
// If query: productId → get reviews for product
// If param: id → get review by review ID
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.query;
    const { id } = req.params;

    let reviews;
    if (id) {
      // Get review by ID
      reviews = await Review.findById(id).populate("user", "name email");
      if (!reviews) return res.status(404).json({ message: "Review not found" });
    } else if (productId) {
      // Get all reviews for a product
      reviews = await Review.find({ product: productId }).populate("user", "name email");
    } else {
      // Get all reviews in system
      reviews = await Review.find().populate("user", "name email");
    }

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Review
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Review not found" });
    if (!review.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Review
// export const deleteReview = async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.id);
//     if (!review) return res.status(404).json({ message: "Review not found" });
//     if (!review.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

//     await review.remove();
//     res.json({ message: "Review deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Review not found" });

    if (!review.user.equals(req.user._id))
      return res.status(403).json({ message: "Not authorized" });

    await review.deleteOne();   // ✅ FIX

    res.json({ message: "Review deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};