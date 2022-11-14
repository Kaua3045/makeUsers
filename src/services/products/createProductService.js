const { client } = require('../../database/connection')
const AppError = require('../../errors/appError')
const Product = require('../../models/product')

module.exports = {
  async createProduct(productData) {
    const { rows } = await client.query('SELECT * FROM products WHERE name = $1', [productData.name])
    const productExists = rows[0]

    if (!productExists) {
      const productCreated = new Product(
        productData.name,
        productData.description,
        productData.price,
        productData.amount
      )

      await client.query(`
      INSERT INTO products (id, name, description, price, amount) VALUES ($1, $2, $3, $4, $5)`, 
      [
        productCreated.id,
        productCreated.name,
        productCreated.description,
        productCreated.price,
        productCreated.amount
      ]
      )
      
      return productCreated
    } else {
      throw new AppError('Product already exists!')
    }
  }
}