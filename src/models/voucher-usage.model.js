const mongoose = require("mongoose");

const voucherUsageSchema = new mongoose.Schema(
  {
    voucher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voucher",
      required: true
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    }
  },
  { timestamps: true }
);

voucherUsageSchema.index({ voucher_id: 1, user_id: 1 });

module.exports = mongoose.model("VoucherUsage", voucherUsageSchema);
