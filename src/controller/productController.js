const Product = require("../models/product")
const ProductImage = require("../models/productImage")
const {
  createProduct,
  getProductById,
  deleteProduct,
  getAllProductAndImages
} = require('../services/products')
const {
  createProductImages,
  deleteProductImage,
  getProductImageById,
  getProductImagesUrl
} = require('../services/products/productImages')

module.exports = {
  async createProductController(req, res) {
    const { name, description, price, amount } = req.body

    const product = new Product(name, description, price, amount)

    const productCreated = await createProduct(product)

    return res.json(productCreated)
  },

  async createProductImagesController(req, res) {
    const { id } = req.params
    const files = req.files

    const productImages = new ProductImage(files, id)

    const result = await createProductImages(productImages, id)

    return res.json(result)
  },

  async getProductByIdController(req, res) {
    const { id } = req.params

    const result = await getProductById(id)
    return res.json(result)
  },

  async getProductImageByIdController(req, res) {
    const { id } = req.params

    const result = await getProductImageById(id)
    return res.json(result)
  },

  async getAllProductController(req, res) {
    const result = await getAllProductAndImages()
    return res.json(result)
  },

  async getAllProductImagesController(req, res) {
    const { id } = req.params
    const result = await getProductImagesUrl(id)
    return res.json(result)
  },

  async deleteProductController(req, res) {
    const { id } = req.params
    await deleteProduct(id)

    return res.status(204).end()
  },

  async deleteProductImageController(req, res) {
    const { id } = req.params
    await deleteProductImage(id)

    return res.status(204).end()
  }
}