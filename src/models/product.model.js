const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    brand: String,

    price: { type: Number, required: true },

    stock: { type: Number, default: 0 },

    description: String,

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },

    specs: {
      screen: String,
      cpu: String,
      ram: String,
      storage: String,
      battery: String,
      camera: String
    }
  },
  { timestamps: true }
);

productSchema.index({ category_id: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model("Product", productSchema);
