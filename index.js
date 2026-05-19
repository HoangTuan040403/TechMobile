require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const seedRoles = require("./src/seeders/role.seeder");
const seedPermissions = require("./src/seeders/permission.seeder");

const PORT = 3000;

connectDB().then(async () => {
  await seedRoles();
  await seedPermissions();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
