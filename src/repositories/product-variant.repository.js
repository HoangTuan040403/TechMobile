const BaseRepository = require("./base.repository");
const ProductVariant = require("../models/product-variant.model");

class ProductVariantRepository extends BaseRepository {
  constructor() {
    super(ProductVariant);
  }

  async findByProductId(product_id) {
    return await this.model
      .find({ product_id })
      .select("_id product_id attributes price discount stock sku createdAt")
      .lean();
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id product_id attributes price discount stock sku createdAt")
      .lean();
  }

  async updateByIdAndReturn(id, data) {
    return await this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        data,
        { new: true, runValidators: true }
      )
      .select("_id product_id attributes price discount stock sku updatedAt")
      .lean();
  }

  async findByIdWithProduct(id) {
    return await this.model
      .findById(id)
      .select("_id product_id attributes price discount stock sku createdAt")
      .populate("product_id", "_id name")
      .lean();
  }
}

module.exports = new ProductVariantRepository();
