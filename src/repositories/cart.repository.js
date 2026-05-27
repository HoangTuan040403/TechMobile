const BaseRepository = require("./base.repository");
const Cart = require("../models/cart.model");

class CartRepository extends BaseRepository {
  constructor() {
    super(Cart);
  }

  async findByUserId(user_id) {
    return await this.model.findOne({ user_id });
  }
}

module.exports = new CartRepository();
