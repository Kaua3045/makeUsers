const { createProductImages } = require('./createProductImageService')
const { deleteAllProductImage, deleteProductImage } = require('./deleteProductImageService')
const { getProductImageById } = require('./getProductImageByIdService')
const { getProductImagesUrl } = require('./getProductImagesUrlService')

module.exports = {
  createProductImages,
  deleteAllProductImage,
  deleteProductImage,
  getProductImageById,
  getProductImagesUrl
}