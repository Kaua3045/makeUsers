const { product_prefix } = require('../../config/redisPrefixes')
const { invalidatePrefix } = require('../../database/redis')
const Product = require('../../models/product')
const ProductExistsError = require('../../errors/productsErrors/productExists')
const ProductRepository = require('../../repositories/products/productRepository')

module.exports = {
  async createProduct(productData) {
    const productRepository = new ProductRepository()
    const productExists = await productRepository.findByName(productData.name)

    if (productExists) {
      throw new ProductExistsError()
    }

    const productCreated = new Product(
      productData.name,
      productData.description,
      productData.price,
      productData.amount
    )
    productCreated.id = productData.id

    const result = await productRepository.create(productCreated)

    await invalidatePrefix(product_prefix)
    
    return result
  }
}