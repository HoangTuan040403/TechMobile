const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      unique: true
    },

    method: {
      type: String,
      enum: ["cod", "paypal", "stripe"]
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"]
    },

    paid_at: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
