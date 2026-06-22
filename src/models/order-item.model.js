const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true
    },

    product_name: {
      type: String,
      required: true
    },

    variant_attributes: [
      {
        _id: false,
        key: { type: String, required: true },
        value: { type: String, required: true }
      }
    ],

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    subtotal: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

orderItemSchema.index({ order_id: 1 });

module.exports = mongoose.model("OrderItem", orderItemSchema);
