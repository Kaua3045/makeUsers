const { client } = require('../../database/connection')
const AppError = require('../../errors/appError')
const Product = require('../../models/product')
const { getProductImagesUrl } = require('./getProductImagesUrlService')

module.exports = {
  async getProductById(id) {
    const productDatabase = await client.query('SELECT * FROM products WHERE id = $1', [id])    
    const productExists = productDatabase.rows[0]

    const productImages = await getProductImagesUrl(id)

    if (!productExists) {
      throw new AppError('Product does not exists!')
    }

    const product = new Product(
      productExists.name,
      productExists.description,
      productExists.price,
      productExists.amount
      )
    product.id = productExists.id
    product.productsImages = productImages
    
    return product
  }
}