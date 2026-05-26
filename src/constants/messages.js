module.exports = {
  AUTH: {
    EMAIL_ALREADY_IN_USE: "Email already in use",
    DEFAULT_ROLE_NOT_FOUND: "Default role not found",
    INVALID_CREDENTIALS: "Invalid email or password",
    ACCOUNT_INACTIVE: "Account has been deactivated",
    LOGOUT_SUCCESS: "Logged out successfully",
    USER_NOT_FOUND: "User not found",
    REFRESH_TOKEN_REQUIRED: "Refresh token is required",
    REFRESH_TOKEN_INVALID: "Refresh token is invalid or expired",
    REFRESH_TOKEN_REUSE_DETECTED: "Refresh token reuse detected",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Access denied. Admins only",
    RESET_PASSWORD_EMAIL_SENT: "Reset password email sent",
    RESET_TOKEN_INVALID: "Reset token is invalid or expired",
    RESET_PASSWORD_SUCCESS: "Password reset successfully",
    VERIFY_EMAIL_SENT: "Verification email sent",
    EMAIL_ALREADY_VERIFIED: "Email already verified",
    VERIFY_TOKEN_INVALID: "Verify token is invalid or expired",
    VERIFY_EMAIL_SUCCESS: "Email verified successfully",
    WRONG_PASSWORD: "Current password is incorrect",
    CHANGE_PASSWORD_SUCCESS: "Password changed successfully",
  },

  VALIDATION: {
    AUTH: {
      NAME_REQUIRED: "Name is required",
      EMAIL_REQUIRED: "Email is required",
      EMAIL_INVALID: "Invalid email format",
      PASSWORD_REQUIRED: "Password is required",
      PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
      PHONE_INVALID: "Invalid phone number",
      ADDRESS_INVALID: "Invalid address",
      CURRENT_PASSWORD_REQUIRED: "Current password is required",
      NEW_PASSWORD_REQUIRED: "New password is required",
      CONFIRM_PASSWORD_REQUIRED: "Confirm password is required",
      PASSWORDS_NOT_MATCH: "Passwords do not match"
    },
    CATEGORY: {
      NAME_REQUIRED: "Name is required",
      NAME_MUST_BE_STRING: "Name must be a string",
      SLUG_MUST_BE_STRING: "Slug must be a string",
      SLUG_INVALID: "Slug must be a valid slug (lowercase, hyphens only)",
      PARENT_ID_INVALID: "parent_id must be a valid MongoDB ObjectId",
      ID_REQUIRED: "Category ID is required",
      ID_INVALID: "Invalid category ID format",
      AT_LEAST_ONE_FIELD: "At least one field must be provided"
    },
    PERMISSION: {
      NAME_REQUIRED: "Name is required",
      NAME_MUST_BE_STRING: "Name must be a string",
      DESCRIPTION_MUST_BE_STRING: "Description must be a string",
      MODULE_REQUIRED: "Module is required",
      MODULE_MUST_BE_STRING: "Module must be a string",
      ID_INVALID: "Invalid ID format",
      IS_ACTIVE_MUST_BE_BOOLEAN: "isActive must be a boolean"
    },
    ROLE: {
      NAME_REQUIRED: "Name is required",
      NAME_MUST_BE_STRING: "Name must be a string",
      DESCRIPTION_MUST_BE_STRING: "Description must be a string",
      PERMISSIONS_MUST_BE_ARRAY: "Permissions must be an array",
      PERMISSION_ID_INVALID: "Each permission must be a valid ObjectId",
      ID_INVALID: "Invalid ID format",
      ID_REQUIRED: "Role ID is required",
      IS_ACTIVE_MUST_BE_BOOLEAN: "isActive must be a boolean"
    },
    PRODUCT: {
      NAME_REQUIRED: "Name is required",
      NAME_MUST_BE_STRING: "Name must be a string",
      PRICE_REQUIRED: "Price is required",
      PRICE_MUST_BE_NUMBER: "Price must be a number",
      PRICE_MUST_BE_POSITIVE: "Price must be greater than 0",
      STOCK_MUST_BE_NUMBER: "Stock must be a non-negative integer",
      DESCRIPTION_MUST_BE_STRING: "Description must be a string",
      CATEGORY_ID_INVALID: "category_id must be a valid MongoDB ObjectId",
      SPECS_MUST_BE_OBJECT: "Specs must be an object",
      ID_INVALID: "Invalid product ID format",
      DISCOUNT_MUST_BE_NUMBER: "Discount must be a number",
      DISCOUNT_INVALID: "Discount must be between 0 and 100"
    }
  },

  UPLOAD: {
    INVALID_FILE_TYPE: "Only jpeg, png, webp image files are accepted",
    FILE_TOO_LARGE: "File size must not exceed 5MB"
  },

  CATEGORY: {
    NAME_ALREADY_EXISTS: "Category name already exists",
    SLUG_ALREADY_EXISTS: "Slug already exists",
    PARENT_NOT_FOUND: "Parent category not found",
    NOT_FOUND: "Category not found",
    CANNOT_BE_OWN_PARENT: "Category cannot be its own parent",
    CIRCULAR_REFERENCE: "Circular reference: parent cannot be a descendant of this category",
    DELETED_SUCCESS: "Category deleted successfully",
    HAS_CHILDREN: "Category has children, cannot delete"
  },

  PERMISSION: {
    NAME_ALREADY_EXISTS: "Permission name already exists",
    NOT_FOUND: "Permission not found",
    DELETED_SUCCESS: "Permission deleted successfully",
    INVALID_IDS: "One or more permission IDs are invalid"
  },

  ROLE: {
    NAME_ALREADY_EXISTS: "Role name already exists",
    NOT_FOUND: "Role not found",
    CREATED_SUCCESS: "Role created successfully",
    DELETED_SUCCESS: "Role deleted successfully",
    HAS_USERS: "Role has users, cannot delete"
  },

  PRODUCT: {
    NAME_ALREADY_EXISTS: "Product name already exists",
    NOT_FOUND: "Product not found",
    DELETED_SUCCESS: "Product deleted successfully"
  },

  PRODUCT_IMAGE: {
    NOT_FOUND: "Product image not found",
  }
};
