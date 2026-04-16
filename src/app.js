const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("./docs/swagger");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
