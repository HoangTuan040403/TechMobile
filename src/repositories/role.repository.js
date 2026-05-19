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

  async findByNameExcludeId(name, excludeId) {
    return await this.model.findOne({ name, _id: { $ne: excludeId } });
  }

  async updateByIdAndReturn(id, data) {
    return await this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        data,
        { new: true, runValidators: true }
      )
      .select("_id name description permissions isActive updatedAt")
      .lean();
  }
}

module.exports = new RoleRepository();
