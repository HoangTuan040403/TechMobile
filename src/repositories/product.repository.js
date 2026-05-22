const BaseRepository = require("./base.repository");
const Product = require("../models/product.model");
const paginate = require("../utils/paginate.util");

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async findByName(name) {
    return await this.model.findOne({ name });
  }

  async findAllProducts({ page, limit, search, category_id }) {
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category_id) {
      query.category_id = category_id;
    }

    return await paginate({
      model: this.model,
      query,
      page,
      limit,
      select: "_id name price discount stock category_id specs createdAt"
    });
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id name price discount stock description category_id specs createdAt")
      .populate("category_id", "_id name slug")
      .lean();
  }
}

module.exports = new ProductRepository();
