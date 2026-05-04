const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("./docs/swagger");
const authRoute = require("./routes/auth.route");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
