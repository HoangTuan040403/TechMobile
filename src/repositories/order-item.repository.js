const BaseRepository = require("./base.repository");
const OrderItem = require("../models/order-item.model");

class OrderItemRepository extends BaseRepository {
  constructor() {
    super(OrderItem);
  }

  async createMany(items) {
    return await this.model.insertMany(items);
  }

  async findByOrderId(order_id) {
    return await this.model
      .find({ order_id })
      .select("_id product_id variant_id product_name variant_attributes price quantity subtotal")
      .lean();
  }
}

module.exports = new OrderItemRepository();
