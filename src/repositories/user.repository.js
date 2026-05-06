const BaseRepository = require("./base.repository");
const User = require("../models/user.model");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  async findByEmailWithPassword(email) {
    return await this.model.findOne({ email }).select("+password");
  }

  async saveRefreshToken(userId, refreshToken) {
    return await this.model.findByIdAndUpdate(userId, { refreshToken }, { new: true });
  }

  async clearRefreshToken(userId) {
    return await this.model.findByIdAndUpdate(userId, { refreshToken: null }, { new: true });
  }
}

module.exports = new UserRepository();
