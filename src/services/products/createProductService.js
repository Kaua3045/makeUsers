const { client } = require('../../database/connection')
const { product_prefix } = require('../../config/redisPrefixes')
const { invalidatePrefix } = require('../../database/redis')
const AppError = require('../../errors/appError')
const Product = require('../../models/product')

module.exports = {
  async createProduct(productData) {
    const { rows } = await client.query('SELECT name FROM products WHERE name = $1', [productData.name])
    const productExists = rows[0]

    if (productExists) {
      throw new AppError('Product already exists!')
    }

    const productCreated = new Product(
      productData.name,
      productData.description,
      productData.price,
      productData.amount
    )
    productCreated.id = productData.id

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

    await invalidatePrefix(product_prefix)
    
    return productCreated
  }
}