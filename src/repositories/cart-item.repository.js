const BaseRepository = require("./base.repository");
const CartItem = require("../models/cart-item.model");

class CartItemRepository extends BaseRepository {
  constructor() {
    super(CartItem);
  }

  async findByCartIdAndProductId(cart_id, product_id) {
    return await this.model.findOne({ cart_id, product_id });
  }

  async findByCartId(cart_id) {
    return await this.model
      .find({ cart_id })
      .populate("product_id", "_id name price discount specs")
      .lean();
  }

  async deleteByCartId(cart_id) {
    return await this.model.deleteMany({ cart_id });
  }
}

module.exports = new CartItemRepository();
