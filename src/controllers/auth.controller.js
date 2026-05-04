const AuthService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    return res.status(201).json({ status: "OK", data: user });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      status: "ERR",
      message: error.message
    });
  }
};

module.exports = { register };
