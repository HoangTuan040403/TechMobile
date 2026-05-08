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

  async findByRefreshToken(refreshToken) {
    return await this.model.findOne({ refreshToken });
  }

  async saveResetToken(userId, token, expires) {
    return await this.model.findByIdAndUpdate(
      userId,
      { resetPasswordToken: token, resetPasswordExpires: expires },
      { new: true }
    );
  }

  async findByResetToken(token) {
    return await this.model.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
  }

  async clearResetToken(userId) {
    return await this.model.findByIdAndUpdate(
      userId,
      { resetPasswordToken: null, resetPasswordExpires: null },
      { new: true }
    );
  }

  async saveVerifyEmailToken(userId, token, expires) {
    return await this.model.findByIdAndUpdate(
      userId,
      { verifyEmailToken: token, verifyEmailExpires: expires },
      { new: true }
    );
  }

  async findByVerifyEmailToken(token) {
    return await this.model.findOne({
      verifyEmailToken: token,
      verifyEmailExpires: { $gt: Date.now() }
    });
  }

  async clearVerifyEmailToken(userId) {
    return await this.model.findByIdAndUpdate(
      userId,
      { verifyEmailToken: null, verifyEmailExpires: null, isVerified: true },
      { new: true }
    );
  }
}

module.exports = new UserRepository();
