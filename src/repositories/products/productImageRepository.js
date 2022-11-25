const { client } = require("../../database/connection")

class ProductImageRepository {
  async findById(id) {
    const productImageDatabase = await client.query('SELECT * FROM products_images WHERE id = $1', [id])
    const productImageRow = productImageDatabase.rows[0]

    return productImageRow
  }

  async findAllImageWithProductId(product_id) {
    const productImagesDatabase = await client.query('SELECT * FROM products_images WHERE product_id = $1', [product_id])
    const productImagesRows = productImagesDatabase.rows

    return productImagesRows
  }

  async create(productImage) {
    await client.query(`
        INSERT INTO products_images (id, name, product_id) VALUES ($1, $2, $3)`,
        [
          productImage.id,
          productImage.name,
          productImage.product_id
        ])
  }

  async remove(id) {
    await client.query('DELETE FROM products_images WHERE id = $1', [id])
  }
}

module.exports = ProductImageRepository