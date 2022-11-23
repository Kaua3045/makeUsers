const { client } = require('../../../database/connection')
const { deleteFile } = require("../../../database/diskStorage")
const { product_prefix } = require('../../../config/redisPrefixes')
const { invalidatePrefix } = require('../../../database/redis')
const ImageNotExistsError = require('../../../errors/imagesErrors/imageNotExists')
const { imagesProductsFolder } = require('../../../config/uploadConfig')

module.exports = {
  async deleteAllProductImage(product_id) {
    const productImagesDatabase = await client.query('SELECT * FROM products_images WHERE product_id = $1', [product_id])
    const productImagesExists = productImagesDatabase.rows

    const ImagesName = productImagesExists.map(image => {
      return image.name
    })

    for (let i = 0; i < ImagesName.length; i++) {
      await deleteFile(ImagesName[i], imagesProductsFolder)
    }

    await invalidatePrefix(product_prefix)
  },

  async deleteProductImage(id) {
    const productImagesDatabase = await client.query('SELECT * FROM products_images WHERE id = $1', [id])
    const productImagesExists = productImagesDatabase.rows[0]

    if (!productImagesExists) {
      throw new ImageNotExistsError()
    }

    await client.query('DELETE FROM products_images WHERE id = $1', [productImagesExists.id])
    await deleteFile(productImagesExists.name, imagesProductsFolder)
    await invalidatePrefix(product_prefix)
  }
}