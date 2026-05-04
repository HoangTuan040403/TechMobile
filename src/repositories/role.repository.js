const BaseRepository = require("./base.repository");
const Role = require("../models/role.model");

class RoleRepository extends BaseRepository {
  constructor() {
    super(Role);
  }

  async findByName(name) {
    return await this.model.findOne({ name });
  }
}

module.exports = new RoleRepository();
