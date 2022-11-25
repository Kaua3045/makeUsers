const { product_prefix } = require('../../config/redisPrefixes')
const { invalidatePrefix } = require('../../database/redis')
const { deleteAllProductImage } = require('./productImages')
const { getProductById } = require('./getProductByIdService')
const ProductNotExistsError = require('../../errors/productsErrors/productNotExists')
const ProductRepository = require('../../repositories/products/productRepository')

module.exports = {
  async deleteProduct(id) {
    const productRepository = new ProductRepository()
    const product = await getProductById(id)
    
    if (!product) {
      throw new ProductNotExistsError()
    }

    await deleteAllProductImage(id)
    await productRepository.remove(id)
    await invalidatePrefix(product_prefix)
  }
}