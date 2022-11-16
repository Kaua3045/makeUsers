const { client } = require('../../../database/connection')
const { deleteFile } = require("../../../database/diskStorage")
const { invalidate } = require('../../../database/redis')
const AppError = require('../../../errors/appError')

module.exports = {
  async deleteAllProductImage(product_id) {
    const productImagesDatabase = await client.query('SELECT * FROM products_images WHERE product_id = $1', [product_id])
    const productImagesExists = productImagesDatabase.rows

    const ImagesName = productImagesExists.map(image => {
      return image.name
    })

    for (let i = 0; i < ImagesName.length; i++) {
      await deleteFile(ImagesName[i])
    }

    await invalidate('products-all')
  },

  async deleteProductImage(id) {
    const productImagesDatabase = await client.query('SELECT * FROM products_images WHERE id = $1', [id])
    const productImagesExists = productImagesDatabase.rows[0]

    if (!productImagesExists) {
      throw new AppError('Image does not exists!')
    }

    await client.query('DELETE FROM products_images WHERE id = $1', [productImagesExists.id])
    await deleteFile(productImagesExists.name)
    await invalidate('products-all')
  }
}