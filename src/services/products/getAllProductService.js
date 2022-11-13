const { client } = require('../../database/connection')
const Product = require('../../models/product')

module.exports = {
  async getAllProductAndImages() {
    const productsDatabase = await client.query('SELECT * FROM products')
    const productsImagesDatabase = await client.query('SELECT * FROM products_images')

    const productsImages = productsImagesDatabase.rows.map(productImages => {
      const url = `${process.env.APP_API_URL}/files/${productImages.name}`
      return url
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