const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    attributes: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true }
      }
    ],

    price: {
      type: Number,
      required: true
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    },

    sku: {
      type: String,
      unique: true,
      sparse: true
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

productVariantSchema.index({ product_id: 1 });
productVariantSchema.index({ deletedAt: 1 });

productVariantSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

module.exports = mongoose.model("ProductVariant", productVariantSchema);
