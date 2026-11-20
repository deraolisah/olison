import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, lowercase: true, trim: true },
    stock: { type: Number, default: 0, min: 0 },
    // image: { type: String, default: "" },
    productImages: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 6,
        message: "A product can have at most 6 images.",
      },
    },
    description: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    imageRatio: {
      type: String,
      enum: ["portrait", "square", "landscape"],
      default: "square",
    },
  },
  { timestamps: true }
);

// Normalize output so the frontend keeps working with `id`
productSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Product", productSchema);