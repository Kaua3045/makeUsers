const { product_prefix } = require('../../config/redisPrefixes')
const { recover, save } = require('../../database/redis')
const ProductNotExistsError = require('../../errors/productsErrors/productNotExists')
const Product = require('../../models/product')
const ProductRepository = require('../../repositories/products/productRepository')
const { getProductImagesUrl } = require('./productImages')

module.exports = {
  async getProductById(id) {
    const productRepository = new ProductRepository()
    const productInMemory = await recover(`${product_prefix}:${id}`)

    if (productInMemory) {
      return productInMemory
    }

    const productExistsInDatabase = await productRepository.findById(id)

    if (!productExistsInDatabase) {
      throw new ProductNotExistsError()
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