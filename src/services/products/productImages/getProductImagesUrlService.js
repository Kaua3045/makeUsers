const { client } = require('../../../database/connection')
const ProductImage = require('../../../models/productImage')

module.exports = {
  async getProductImagesUrl(product_id) {
    const productImagesDatabase = await client.query('SELECT * FROM products_images WHERE product_id = $1', [product_id])

    const imagesUrl = productImagesDatabase.rows.map(url => {
      const productImages = new ProductImage(url.name, product_id)
      productImages.id = url.id
      productImages.url = productImages.getProductImageUrl(url.name)
      
      return productImages
    })

    return imagesUrl
  }
}