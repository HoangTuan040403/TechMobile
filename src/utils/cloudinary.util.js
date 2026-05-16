const cloudinary = require("../config/cloudinary.config");

const uploadToCloudinary = (file, folder = "general") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve({ url: result.secure_url, public_id: result.public_id });
      }
    ).end(file.buffer);
  });
};

const deleteFromCloudinary = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
