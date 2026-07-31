const BaseRepository = require("./base.repository");
const VoucherUsage = require("../models/voucher-usage.model");

class VoucherUsageRepository extends BaseRepository {
  constructor() {
    super(VoucherUsage);
  }

  async countByVoucherAndUser(voucher_id, user_id) {
    return await this.model.countDocuments({ voucher_id, user_id });
  }
}

module.exports = new VoucherUsageRepository();
