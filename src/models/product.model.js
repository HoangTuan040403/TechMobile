const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    price: { type: Number, required: true },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    stock: { type: Number, default: 0 },

    description: String,

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },

    specs: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

productSchema.index({ category_id: 1 });
productSchema.index({ price: 1 });
productSchema.index({ deletedAt: 1 });

productSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

module.exports = mongoose.model("Product", productSchema);
