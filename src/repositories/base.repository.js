class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    return await this.model.find();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findOne(filter) {

    return await this.model.findOne(filter);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async updateById(id, data, options = {}) {
    return await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true, ...options });
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
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

module.exports = BaseRepository;
