const { client } = require('../../database/connection')
const { product_prefix } = require('../../config/redisPrefixes')
const { save, recoverPrefix } = require('../../database/redis')
const Product = require('../../models/product')
const ProductImage = require('../../models/productImage')

module.exports = {
  async getAllProductAndImages() {
    let productsDatabase = await recoverPrefix(product_prefix)

    if (!productsDatabase) {
      const { rows } = await client.query(`
      SELECT products.*, (
        SELECT json_agg(json_build_object(
          'id', products_images.id,
          'name', products_images.name
        ))
        FROM products_images
        WHERE products_images.product_id = products.id
      ) AS images FROM products`)

      const products = rows.map(productDatabase => {
        const product = new Product(
          productDatabase.name,
          productDatabase.description,
          productDatabase.price,
          productDatabase.amount
        )
        product.id = productDatabase.id
  
        product.productsImages = productDatabase.images ? productDatabase.images.map(img => {
          const productImage = new ProductImage(img.name, product.id)
          productImage.id = img.id
          productImage.url = productImage.getProductImageUrl(img.name)
          
          return productImage
        }) : 'not images'

        save(`${product_prefix}:${product.id}`, product)

        return product
      })

      return products
    }

    return productsDatabase
  }
}