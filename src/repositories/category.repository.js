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
    return await this.model
      .findById(id)
      .populate("ancestors", "_id name slug");
  }

  async findAll() {
    return await this.model
      .find()
      .select("_id name slug parent_id ancestors image")
      .lean();
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id name slug parent_id ancestors image")
      .lean();
  }

  async findByNameExcludeId(name, excludeId) {
    return await this.model.findOne({ name, _id: { $ne: excludeId } });
  }

  async findBySlugExcludeId(slug, excludeId) {
    return await this.model.findOne({ slug, _id: { $ne: excludeId } });
  }

  async updateByIdAndReturn(id, data) {
    return await this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        data,
        { new: true, runValidators: true }
      )
      .select("_id name slug parent_id ancestors image updatedAt")
      .lean();
  }

  async softDeleteById(id) {
    return await this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        { deletedAt: new Date() },
        { new: true }
      )
      .lean();
  }
}

module.exports = new CategoryRepository();
