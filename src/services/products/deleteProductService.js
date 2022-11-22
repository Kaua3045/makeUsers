const { client } = require('../../database/connection')
const { product_prefix } = require('../../config/redisPrefixes')
const { invalidatePrefix } = require('../../database/redis')
const AppError = require('../../errors/appError')
const { deleteAllProductImage } = require('./productImages')
const { getProductById } = require('./getProductByIdService')

module.exports = {
  async deleteProduct(id) {
    const product = await getProductById(id)
    
    if (!product) {
      throw new AppError('Product does not exists!')
    }

    await deleteAllProductImage(id)
    await client.query('DELETE FROM products WHERE id = $1', [product.id])
    await invalidatePrefix(product_prefix)
  }
}