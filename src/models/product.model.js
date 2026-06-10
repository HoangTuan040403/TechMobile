const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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
productSchema.index({ deletedAt: 1 });

productSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

module.exports = mongoose.model("Product", productSchema);
