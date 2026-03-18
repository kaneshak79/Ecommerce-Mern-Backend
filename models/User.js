// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["buyer", "seller"], default: "buyer" },
//     address: { type: String, trim: true },
//     store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
//     resetPasswordToken: String,
//     resetPasswordExpire: Date,
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["buyer", "seller"], default: "buyer" },
    address: { type: String, trim: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },

    // ✅ ADD THESE
    totalOrders: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;