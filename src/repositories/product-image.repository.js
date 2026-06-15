const BaseRepository = require("./base.repository");
const ProductImage = require("../models/product-image.model");

class ProductImageRepository extends BaseRepository {
  constructor() {
    super(ProductImage);
  }

  async findByProductId(product_id) {
    return await this.model
      .find({ product_id })
      .select("_id variant_id url public_id is_thumbnail order createdAt")
      .sort({ order: 1 })
      .lean();
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id variant_id url public_id is_thumbnail order product_id createdAt")
      .lean();
  }

  async updateByIdAndReturn(id, data) {
    return await this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        data,
        { new: true, runValidators: true }
      )
      .select("_id variant_id url public_id is_thumbnail order updatedAt")
      .lean();
  }

  async clearThumbnail(product_id, variant_id) {
    return await this.model.updateMany(
      { product_id, variant_id: variant_id ?? null, deletedAt: null },
      { is_thumbnail: false }
    );
  }
}

module.exports = new ProductImageRepository();
