const { createProduct } = require('./createProductService')
const { deleteProduct } = require('./deleteProductService')
const { getAllProductAndImages } = require('./getAllProductService')
const { getProductById } = require('./getProductByIdService')

module.exports = {
  createProduct,
  deleteProduct,
  getAllProductAndImages,
  getProductById
}