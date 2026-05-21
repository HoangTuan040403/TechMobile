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
}

module.exports = new ProductRepository();
