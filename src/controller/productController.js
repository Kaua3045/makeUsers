const Product = require("../models/product")
const ProductImage = require("../models/productImage")
const { createProduct } = require("../services/products/createProductService")
const { createProductImages } = require('../services/products/createProductImageService')
const { getProductById } = require("../services/products/getProductByIdService")
const { deleteProduct } = require("../services/products/deleteProductService")
const { deleteProductImage } = require("../services/products/deleteProductImageService")
const { getProductImageById } = require("../services/products/getProductImageByIdService")
const { getAllProductAndImages } = require("../services/products/getAllProductService")

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