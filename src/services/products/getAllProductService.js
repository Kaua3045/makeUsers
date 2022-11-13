const { client } = require('../../database/connection')
const Product = require('../../models/product')
const ProductImage = require('../../models/productImage')

module.exports = {
  async getAllProductAndImages() {
    const productsDatabase = await client.query('SELECT * FROM products')
    const productsImagesDatabase = await client.query('SELECT * FROM products_images')

    const productsImages = productsImagesDatabase.rows.map(productImages => {
      const url = `${process.env.APP_API_URL}/files/${productImages.name}`
      const productImage = new ProductImage(productImages.name, productImages.product_id)
      productImage.id = productImages.id
      productImage.url = url
      return productImage
    })

    const products = productsDatabase.rows.map(product => {
      const newProduct = new Product(
        product.name,
        product.description,
        product.price,
        product.amount
        )
      newProduct.id = product.id
      newProduct.productsImages = productsImages

      return newProduct
    })

    return products
  }
}