const BaseRepository = require("./base.repository");
const Order = require("../models/order.model");
const paginate = require("../utils/paginate.util");

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

  async findAllByUserId({ user_id, page, limit, status }) {
    const query = { user_id };

    if (status) query.status = status;

    return await paginate({
      model: this.model,
      query,
      page,
      limit,
      select: "_id total_price status shipping_address createdAt"
    });
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id user_id total_price status address_id shipping_address note createdAt")
      .lean();
  }
}

module.exports = new OrderRepository();
