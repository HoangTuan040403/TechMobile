const BaseRepository = require("./base.repository");
const Role = require("../models/role.model");

class RoleRepository extends BaseRepository {
  constructor() {
    super(Role);
  }

  async findByName(name) {
    return await this.model.findOne({ name });
  }

  async findAll() {
    return await this.model
      .find()
      .select("_id name description permissions isActive")
      .lean();
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id name description permissions isActive")
      .lean();
  }
}

module.exports = new RoleRepository();
