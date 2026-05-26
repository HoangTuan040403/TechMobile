const BaseRepository = require("./base.repository");
const ProductImage = require("../models/product-image.model");

class ProductImageRepository extends BaseRepository {
  constructor() {
    super(ProductImage);
  }

  async findByProductId(product_id) {
    return await this.model
      .find({ product_id })
      .select("_id url public_id is_thumbnail order createdAt")
      .sort({ order: 1 })
      .lean();
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id url public_id is_thumbnail order product_id createdAt")
      .lean();
  }
}

module.exports = new ProductImageRepository();
