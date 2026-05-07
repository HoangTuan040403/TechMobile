const errorHandler = (err, req, res, next) => {
  console.error(err);
  return res.status(err.statusCode || 500).json({
    status: "ERR",
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;
