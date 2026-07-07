const BaseRepository = require("./base.repository");
const Voucher = require("../models/voucher.model");
const paginate = require("../utils/paginate.util");

class VoucherRepository extends BaseRepository {
  constructor() {
    super(Voucher);
  }

  async findByCode(code) {
    return await this.model.findOne({ code });
  }

  async findAllVouchers({ page, limit, search }) {
    const query = {};

    if (search) {
      query.code = { $regex: search, $options: "i" };
    }

    return await paginate({
      model: this.model,
      query,
      page,
      limit,
      select: "_id code discount_type discount_value max_discount min_order_value max_uses used_count start_date end_date isActive createdAt"
    });
  }
}

module.exports = new VoucherRepository();
