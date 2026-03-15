// // import mongoose from "mongoose";

// // const storeSchema = mongoose.Schema({
// //   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //   name: { type: String, required: true },
// //   description: String
// // },{ timestamps: true });

// // export default mongoose.model("Store", storeSchema);

// import mongoose from "mongoose";

// const storeSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     name: {
//       type: String,
//       required: [true, "Store name is required"],
//     },
//     description: {
//       type: String,
//     },
//     location: {
//       type: String,
//     },
//     contactEmail: {
//       type: String,
//     },
//     contactPhone: {
//       type: String,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// // Optional: pre-save hook if you want to normalize store name
// storeSchema.pre("save", function (next) {
//   if (this.name) this.name = this.name.trim();
//   next();
// });

// const Store = mongoose.model("Store", storeSchema);
// export default Store;
import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    location: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;