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

  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
