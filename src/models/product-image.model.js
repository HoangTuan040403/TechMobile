const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    is_thumbnail: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

productImageSchema.index({ product_id: 1 });
productImageSchema.index({ deletedAt: 1 });

productImageSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

module.exports = mongoose.model("ProductImage", productImageSchema);
