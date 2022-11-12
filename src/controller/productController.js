const Product = require("../models/product")
const ProductImage = require("../models/productImage")
const { createProduct } = require("../services/products/createProductService")
const { createProductImages } = require('../services/products/createProductImageService')
const { getProductById } = require("../services/products/getProductByIdService")
const { deleteProduct } = require("../services/products/deleteProductService")

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

  async deleteProductController(req, res) {
    const { id } = req.params
    await deleteProduct(id)

    return res.status(204).end()
  }
}