const BaseRepository = require("./base.repository");
const Voucher = require("../models/voucher.model");

class VoucherRepository extends BaseRepository {
  constructor() {
    super(Voucher);
  }

  async findByCode(code) {
    return await this.model.findOne({ code });
  }
}

module.exports = new VoucherRepository();
