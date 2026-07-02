const mongoose = require("mongoose");
const { ORDER_STATUS, ORDER_TYPE } = require("../constants/order.constant");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    guest_name: {
      type: String,
      default: null
    },

    guest_phone: {
      type: String,
      default: null
    },

    total_price: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING
    },

    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: null
    },

    shipping_address: {
      type: String,
      default: null
    },

    note: {
      type: String,
      default: null
    },

    type: {
      type: String,
      enum: Object.values(ORDER_TYPE),
      default: ORDER_TYPE.ONLINE
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

orderSchema.index({ user_id: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ deletedAt: 1 });

orderSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

module.exports = mongoose.model("Order", orderSchema);
