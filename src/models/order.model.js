const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    total_price: Number,

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending"
    },

    shipping_address: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
