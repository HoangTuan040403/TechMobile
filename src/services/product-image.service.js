const productImageRepository = require("../repositories/product-image.repository");
const productRepository = require("../repositories/product.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");
const { uploadToCloudinary } = require("../utils/cloudinary.util");

const uploadProductImages = async (product_id, files) => {
  const product = await productRepository.findById(product_id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  const existingImages = await productImageRepository.findByProductId(product_id);
  const nextOrder = existingImages.length;

  const uploaded = await Promise.all(
    files.map(async (file, index) => {
      const { url, public_id } = await uploadToCloudinary(file, "products");
      return productImageRepository.create({
        product_id,
        url,
        public_id,
        is_thumbnail: existingImages.length === 0 && index === 0,
        order: nextOrder + index
      });
    })
  );

  return uploaded.map((img) => ({
    _id: img._id,
    url: img.url,
    public_id: img.public_id,
    is_thumbnail: img.is_thumbnail,
    order: img.order,
    createdAt: img.createdAt
  }));
};

module.exports = { uploadProductImages };
