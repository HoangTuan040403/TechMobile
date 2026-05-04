const Role = require("../models/role.model");

const seedRoles = async () => {
  const roles = ["user", "admin"];

  for (const name of roles) {
    const existed = await Role.findOne({ name });
    if (!existed) {
      await Role.create({ name, description: `${name} role` });
      console.log(`Created role: ${name}`);
    }
  }
};

module.exports = seedRoles;
