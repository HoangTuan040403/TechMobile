const productImageRepository = require("../repositories/product-image.repository");
const productRepository = require("../repositories/product.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary.util");

const formatImage = (img) => ({
  _id: img._id,
  variant_id: img.variant_id,
  url: img.url,
  public_id: img.public_id,
  is_thumbnail: img.is_thumbnail,
  order: img.order,
  createdAt: img.createdAt
});

const uploadProductImages = async (product_id, files, variant_id) => {
  const product = await productRepository.findById(product_id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  const existingImages = await productImageRepository.findByProductId(product_id);
  
  const variantImages = existingImages.filter((img) => {
    const imgVariantId = img.variant_id?.toString() ?? null;
    const inputVariantId = variant_id ?? null;
    return imgVariantId === inputVariantId;
  });

  const nextOrder = variantImages.length;

  const uploaded = await Promise.all(
    files.map(async (file, index) => {
      const { url, public_id } = await uploadToCloudinary(file, "products");
      return productImageRepository.create({
        product_id,
        variant_id: variant_id || null,
        url,
        public_id,
        is_thumbnail: variantImages.length === 0 && index === 0,
        order: nextOrder + index
      });
    })
  );

  return uploaded.map(formatImage);
};

const getProductImages = async (product_id, variant_id) => {
  const product = await productRepository.findById(product_id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  const images = await productImageRepository.findByProductId(product_id);

  if (variant_id) {
    return images.filter((img) => img.variant_id?.toString() === variant_id).map(formatImage);
  }

  return images.map(formatImage);
};

const updateProductImage = async (product_id, image_id, { is_thumbnail, order }) => {
  const product = await productRepository.findById(product_id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  const image = await productImageRepository.findById(image_id);
  if (!image) throw createError(MESSAGES.PRODUCT_IMAGE.NOT_FOUND, 404);

  const updatePayload = {};

  if (is_thumbnail === true) {
    await productImageRepository.clearThumbnail(product_id, image.variant_id);
    updatePayload.is_thumbnail = true;
  }

  if (order !== undefined) updatePayload.order = order;

  const updated = await productImageRepository.updateByIdAndReturn(image_id, updatePayload);
  return formatImage(updated);
};

const deleteProductImage = async (product_id, image_id) => {
  const product = await productRepository.findById(product_id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  const image = await productImageRepository.findById(image_id);
  if (!image) throw createError(MESSAGES.PRODUCT_IMAGE.NOT_FOUND, 404);

  await deleteFromCloudinary(image.public_id);
  await productImageRepository.deleteById(image_id);
};

module.exports = { uploadProductImages, getProductImages, updateProductImage, deleteProductImage };
