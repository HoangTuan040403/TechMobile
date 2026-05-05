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

const login = async (req, res) => {
  try {
    const result = await AuthService.login(req.body);
    return res.status(200).json({ status: "OK", data: result });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      status: "ERR",
      message: error.message
    });
  }
};

module.exports = { register, login };
