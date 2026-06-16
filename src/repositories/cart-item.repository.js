const BaseRepository = require("./base.repository");
const CartItem = require("../models/cart-item.model");

class CartItemRepository extends BaseRepository {
  constructor() {
    super(CartItem);
  }

  async findByCartIdAndVariantId(cart_id, variant_id) {
    return await this.model.findOne({ cart_id, variant_id });
  }

  async findByCartId(cart_id) {
    return await this.model
      .find({ cart_id })
      .populate("product_id", "_id name specs")
      .populate("variant_id", "_id attributes price discount stock")
      .lean();
  }

  async deleteByCartId(cart_id) {
    return await this.model.deleteMany({ cart_id });
  }
}

module.exports = new CartItemRepository();
