const BaseRepository = require("./base.repository");
const Category = require("../models/category.model");

class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category);
  }

  async findByName(name) {
    return await this.model.findOne({ name });
  }

  async findBySlug(slug) {
    return await this.model.findOne({ slug });
  }

  async findByIdWithAncestors(id) {
    return await this.model.findById(id).populate("ancestors", "name slug");
  }

  async findAll() {
    return await this.model
      .find()
      .select("_id name slug parent_id ancestors")
      .lean();
  }
}

module.exports = new CategoryRepository();
