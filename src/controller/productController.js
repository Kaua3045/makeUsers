const Product = require("../models/product")
const ProductImage = require("../models/productImage")
const { createProduct } = require("../services/products/createProductService")
const { createProductImages } = require('../services/products/createProductImageService')

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
  }
}