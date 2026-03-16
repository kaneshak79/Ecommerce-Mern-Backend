
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