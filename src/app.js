const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("./docs/swagger");
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.middleware");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const permissionRoute = require("./routes/permission.route");
const roleRoute = require("./routes/role.route");
const productRoute = require("./routes/product.route");
const productImageRoute = require("./routes/product-image.route");
const cartRoute = require("./routes/cart.route");
const addressRoute = require("./routes/address.route");
const productVariantRoute = require("./routes/product-variant.route");
const orderRoute = require("./routes/order.route");
const adminOrderRoute = require("./routes/admin.order.route");
const adminVoucherRoute = require("./routes/admin.voucher.route");
const vocuerRoute = require("./routes/voucher.route");

const app = express();

app.use(express.json());
app.use(cookieParser()); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/permissions", permissionRoute);
app.use("/api/roles", roleRoute);
app.use("/api/products", productRoute);
app.use("/api/products/:id/images", productImageRoute);
app.use("/api/cart", cartRoute);
app.use("/api/addresses", addressRoute);
app.use("/api/products/:id/variants", productVariantRoute);
app.use("/api/orders", orderRoute);
app.use("/api/admin/orders", adminOrderRoute);
app.use("/api/admin/vouchers", adminVoucherRoute);
app.use("/api/vouchers", vocuerRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

module.exports = app;
