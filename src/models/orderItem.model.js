const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },

  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  product_name: String,

  price: Number,

  quantity: Number
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
