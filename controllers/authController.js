

import User from "../models/User.js";
import Store from "../models/Store.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";

// Helper
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register Seller
export const registerSeller = async (req, res) => {
  try {
    const { name, email, password, storeName, storeDescription } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: "Email exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: "seller" });

    const store = await Store.create({ user: user._id, name: storeName, description: storeDescription });
    user.store = store._id;
    await user.save();

    res.status(201).json({ user, store, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register Buyer
export const registerBuyer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: "Email exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: "buyer" });

    res.status(201).json({ user, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("store");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ user, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  res.json(req.user);
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Store
export const updateStore = async (req, res) => {
  try {
    if (req.user.role !== "seller") return res.status(403).json({ message: "Access denied" });
    const store = await Store.findOne({ user: req.user._id });
    const { name, description, location, contactEmail, contactPhone } = req.body;
    if (name) store.name = name;
    if (description) store.description = description;
    if (location) store.location = location;
    if (contactEmail) store.contactEmail = contactEmail;
    if (contactPhone) store.contactPhone = contactPhone;
    await store.save();
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// -----------------------------
// Change Password
// -----------------------------
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!(await bcrypt.compare(oldPassword, user.password)))
      return res.status(400).json({ message: "Old password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -----------------------------
// Forgot Password (Brevo API Key)
// -----------------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Reset URL
    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/resetpassword/${resetToken}`;

    // Send email via Brevo API Key
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.BREVO_SENDER_EMAIL,
          name: process.env.BREVO_SENDER_NAME,
        },
        to: [{ email: user.email, name: user.name }],
        subject: "Password Reset Request",
        htmlContent: `
          <p>Hello ${user.name},</p>
          <p>You requested a password reset. Click below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>If you did not request this, ignore this email.</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ message: "Reset password email sent via Brevo" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// -----------------------------
// Reset Password
// -----------------------------
export const resetPassword = async (req, res) => {
  try {
    const resetToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};