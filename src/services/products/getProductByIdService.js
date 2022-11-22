const { product_prefix } = require('../../config/redisPrefixes')
const { client } = require('../../database/connection')
const { recover, save } = require('../../database/redis')
const AppError = require('../../errors/appError')
const Product = require('../../models/product')
const { getProductImagesUrl } = require('./productImages')

module.exports = {
  async getProductById(id) {
    const productInMemory = await recover(`${product_prefix}:${id}`)
    // const productDatabase = await client.query('SELECT * FROM products WHERE id = $1', [id])    
    // const productExists = productDatabase.rows[0]

    // const productImages = await getProductImagesUrl(id)

    if (productInMemory) {
      return productInMemory
    }

    const productDatabase = await client.query('SELECT * FROM products WHERE id = $1', [id])
    const productExistsInDatabase = productDatabase.rows[0]

    if (!productExistsInDatabase) {
      throw new AppError('Product does not exists!')
    }

    const productImages = await getProductImagesUrl(id)

    const product = new Product(
      productExistsInDatabase.name,
      productExistsInDatabase.description,
      productExistsInDatabase.price,
      productExistsInDatabase.amount
      )
    product.id = productExistsInDatabase.id
    product.productsImages = productImages ? productImages : 'not images'

    await save(`${product_prefix}:${product.id}`, product)
    
    return product
  }
}