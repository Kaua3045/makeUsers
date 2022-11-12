const { client } = require('../../database/connection')
const AppError = require('../../errors/appError')
const { deleteProductImage } = require('./deleteProductImageService')
const { getProductById } = require('./getProductByIdService')

module.exports = {
  async deleteProduct(id) {
    const product = await getProductById(id)
    
    if (!product) {
      throw new AppError('Product does not exists!')
    }

    await deleteProductImage(id)
    await client.query('DELETE FROM products WHERE id = $1', [product.id])
  }
}