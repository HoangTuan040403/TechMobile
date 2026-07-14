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

  async findById(id) {
    return await this.model
      .findById(id)
      .select("_id code discount_type discount_value max_discount min_order_value max_uses max_uses_per_user used_count start_date end_date isActive createdAt")
      .lean();
  }

  async findByCodeExcludeId(code, excludeId) {
    return await this.model.findOne({ code, _id: { $ne: excludeId } });
  }

  async updateByIdAndReturn(id, data) {
    return await this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        data,
        { new: true, runValidators: true }
      )
      .select("_id code discount_type discount_value max_discount min_order_value max_uses max_uses_per_user used_count start_date end_date isActive updatedAt")
      .lean();
  }
}

module.exports = new VoucherRepository();
