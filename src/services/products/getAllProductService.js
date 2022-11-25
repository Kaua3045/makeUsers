const { product_prefix } = require('../../config/redisPrefixes')
const { save, recoverPrefix } = require('../../database/redis')
const Product = require('../../models/product')
const ProductImage = require('../../models/productImage')
const ProductRepository = require('../../repositories/products/productRepository')

module.exports = {
  async getAllProductAndImages() {
    const productRepository = new ProductRepository()
    let productsDatabase = await recoverPrefix(product_prefix)

    if (!productsDatabase) {
      const productsRows = await productRepository.findAllProducts()
      
      const products = productsRows.map(productMap => {
        const product = new Product(
          productMap.name,
          productMap.description,
          productMap.price,
          productMap.amount
        )
        product.id = productMap.id

        product.productsImages = productMap.images ? productMap.images.map(img => {
          const productImage = new ProductImage(img.name, product.id)
          productImage.id = img.id
          productImage.url = ProductImage.getProductImageUrl(img.name)

          return productImage
        }) : []
        // RETORNAVA 'NOT IMAGES' agora retorna um array vaziou, ver se vai continuar funcionando

        save(`${product_prefix}:${product.id}`, product)

        return product
      })

      return products
    }

    return productsDatabase
  }
}