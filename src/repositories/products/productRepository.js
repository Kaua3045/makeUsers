const { client } = require('../../database/connection')

class ProductRepository {
  async findAllProducts() {
    const { rows } = await client.query(`
      SELECT products.*, (
        SELECT json_agg(json_build_object(
          'id', products_images.id,
          'name', products_images.name
        ))
        FROM products_images
        WHERE products_images.product_id = products.id
      ) AS images FROM products`)

    return rows
  }

  async findByName(name) {
    const productDatabase = await client.query('SELECT * FROM products WHERE name = $1', [name])
    const product = productDatabase.rows[0]

    return product
  }

  async findById(id) {
    const productDatabase = await client.query('SELECT * FROM products WHERE id = $1', [id])
    const product = productDatabase.rows[0]

    return product
  }

  async create(product) {
    const productDatabase = await client.query(`
    INSERT INTO products (id, name, description, price, amount) VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, description, price, amount`, 
    [
      product.id,
      product.name,
      product.description,
      product.price,
      product.amount
    ]
    )

    const productCreated = productDatabase.rows[0]
    return productCreated
  }

  async remove(id) {
    await client.query('DELETE FROM products WHERE id = $1', [id])
  }
}

module.exports = ProductRepository