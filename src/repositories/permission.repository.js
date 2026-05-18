const BaseRepository = require("./base.repository");
const Permission = require("../models/permission.model");

class PermissionRepository extends BaseRepository {
  constructor() {
    super(Permission);
  }

  async findByName(name) {
    return await this.model.findOne({ name });
  }

  async findAll() {
    return await this.model
      .find()
      .select("_id name description module isActive createdAt")
      .lean();
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id name description module isActive createdAt")
      .lean();
  }
}

module.exports = new PermissionRepository();
