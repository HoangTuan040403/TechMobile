const Role = require("../models/role.model");
const Permission = require("../models/permission.model");

const seedRoles = async () => {
  const roles = ["user", "admin"];

  for (const name of roles) {
    const existed = await Role.collection.findOne({ name });
    if (!existed) {
      let permissions = [];

      if (name === "admin") {
        const allPermissions = await Permission.find().select("_id").lean();
        permissions = allPermissions.map((p) => p._id);
      }

      await Role.create({ name, description: `${name} role`, permissions });
      console.log(`Created role: ${name}`);
    }
  }
};

module.exports = seedRoles;
