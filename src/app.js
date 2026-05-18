const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("./docs/swagger");
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.middleware");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const permissionRoute = require("./routes/permission.route");

const app = express();

app.use(express.json());
app.use(cookieParser()); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/permissions", permissionRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

module.exports = app;
