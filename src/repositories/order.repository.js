const BaseRepository = require("./base.repository");
const Order = require("../models/order.model");

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id user_id total_price status address_id shipping_address note createdAt")
      .lean();
  }
}

module.exports = new OrderRepository();
