const BaseRepository = require("./base.repository");
const Address = require("../models/address.model");

class AddressRepository extends BaseRepository {
  constructor() {
    super(Address);
  }

  async clearDefault(user_id) {
    return await this.model.updateMany(
      { user_id, deletedAt: null },
      { is_default: false }
    );
  }
}

module.exports = new AddressRepository();
