const { client } = require('../../database/connection')
const { deleteFile } = require("../../database/diskStorage")

module.exports = {
  async deleteProductImage(product_id) {
    const productImagesDatabase = await client.query('SELECT * FROM products_images WHERE product_id = $1', [product_id])
    const productImagesExists = productImagesDatabase.rows

    const ImagesName = productImagesExists.map(image => {
      return image.name
    })

    for (let i = 0; i < ImagesName.length; i++) {
      await deleteFile(ImagesName[i])
    }
  }
}