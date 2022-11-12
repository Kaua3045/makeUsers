const { client } = require('../../database/connection')

module.exports = {
  async getProductImagesUrl(product_id) {
    const productImagesDatabase = await client.query('SELECT * FROM products_images WHERE product_id = $1', [product_id])
    const productImagesExists = productImagesDatabase.rows

    const imagesUrl = productImagesExists.map(url => {
      return `${process.env.APP_API_URL}/files/${url.name}`
    })

    return imagesUrl
  }
}