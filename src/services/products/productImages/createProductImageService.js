const { client } = require('../../../database/connection')
const { saveFile } = require('../../../database/diskStorage')
const { invalidate } = require('../../../database/redis')
const ProductImage = require("../../../models/productImage")

module.exports = {
  async createProductImages(productImages, id) {
    const { rows } = await client.query('SELECT id FROM products WHERE id = $1', [id])
    const productExists = rows[0]

    if (productExists) { 
      const imagesMap = productImages.name.map(images => {
        return images.filename
      })

      for (let i = 0; i < imagesMap.length; i++) {
        const imageFile = await saveFile(imagesMap[i])
        const productImagesCreated = new ProductImage(imageFile, id)
        productImagesCreated.id = productImages.id

        await client.query(`
        INSERT INTO products_images (id, name, product_id) VALUES ($1, $2, $3)`,
        [
          productImagesCreated.id,
          productImagesCreated.name,
          productImagesCreated.product_id
        ])
      }

      await invalidate('products-all')
    }
  }
}