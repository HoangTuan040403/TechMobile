const BaseRepository = require("./base.repository");
const Permission = require("../models/permission.model");
const paginate = require("../utils/paginate.util");

class PermissionRepository extends BaseRepository {
  constructor() {
    super(Permission);
  }

  async findByName(name) {
    return await this.model.findOne({ name });
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id name description module isActive createdAt")
      .lean();
  }

  async findAllPermissions({ page, limit, search, module }) {
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (module) query.module = module;

    return await paginate({
      model: this.model,
      query,
      page,
      limit,
      select: "_id name description module isActive createdAt"
    });
  }
}

module.exports = new PermissionRepository();
