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

    async findByUserId(user_id) {
        return await this.model
            .find({ user_id })
            .select("_id full_name phone address is_default createdAt")
            .lean();
    }

    async findById(id) {
        return await this.model
            .findById(id)
            .select("_id user_id full_name phone address is_default createdAt")
            .lean();
    }
}

module.exports = new AddressRepository();
