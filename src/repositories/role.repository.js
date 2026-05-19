const BaseRepository = require("./base.repository");
const Role = require("../models/role.model");
const paginate = require("../utils/paginate.util");

class RoleRepository extends BaseRepository {
  constructor() {
    super(Role);
  }

  async findByName(name) {
    return await this.model.findOne({ name });
  }

  async findAllRoles({ page, limit, search }) {
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    return await paginate({
      model: this.model,
      query,
      page,
      limit,
      select: "_id name description permissions isActive createdAt"
    });
  }
}

module.exports = new RoleRepository();
