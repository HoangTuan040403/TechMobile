const Permission = require("../models/permission.model");

const seedPermissions = async () => {
    const permissions = [
        // Category
        { name: "category:create", description: "Create category", module: "category" },
        { name: "category:update", description: "Update category", module: "category" },
        { name: "category:delete", description: "Delete category", module: "category" },

        // Product
        { name: "product:create", description: "Create product", module: "product" },
        { name: "product:update", description: "Update product", module: "product" },
        { name: "product:delete", description: "Delete product", module: "product" },

        // Order
        { name: "order:view", description: "View order", module: "order" },
        { name: "order:update", description: "Update order status", module: "order" },
        { name: "order:delete", description: "Delete order", module: "order" },

        // User
        { name: "user:view", description: "View user", module: "user" },
        { name: "user:update", description: "Update user", module: "user" },
        { name: "user:delete", description: "Delete user", module: "user" },

        // Role
        { name: "role:create", description: "Create role", module: "role" },
        { name: "role:view", description: "View role", module: "role" },
        { name: "role:update", description: "Update role", module: "role" },
        { name: "role:delete", description: "Delete role", module: "role" },

        // Permission
        { name: "permission:create", description: "Create permission", module: "permission" },
        { name: "permission:view", description: "View permission", module: "permission" },
        { name: "permission:update", description: "Update permission", module: "permission" },
        { name: "permission:delete", description: "Delete permission", module: "permission" }
    ];

    for (const item of permissions) {
        const existed = await Permission.collection.findOne({ name: item.name });
        if (!existed) {
            await Permission.create(item);
            console.log(`Created permission: ${item.name}`);
        }
    }
};

module.exports = seedPermissions;
