const ProductImageRepository = require("../../../repositories/products/productImageRepository")

const { deleteFile } = require("../../../database/diskStorage")
const { product_prefix } = require('../../../config/redisPrefixes')
const { invalidatePrefix } = require('../../../database/redis')
const ImageNotExistsError = require('../../../errors/imagesErrors/imageNotExists')
const { imagesProductsFolder } = require('../../../config/uploadConfig')

module.exports = {
  async deleteAllProductImage(product_id) {
    const productImageRepository = new ProductImageRepository()

    const productImagesExists = await productImageRepository.findAllImageWithProductId(product_id)

    const ImagesName = productImagesExists.map(image => {
      return image.name
    })

    for (let i = 0; i < ImagesName.length; i++) {
      await deleteFile(ImagesName[i], imagesProductsFolder)
    }

    await invalidatePrefix(product_prefix)
  },

  async deleteProductImage(id) {
    const productImageRepository = new ProductImageRepository()

    const productImagesExists = await productImageRepository.findById(id)

    if (!productImagesExists) {
      throw new ImageNotExistsError()
    }

    await productImageRepository.remove(productImagesExists.id)
    await deleteFile(productImagesExists.name, imagesProductsFolder)
    await invalidatePrefix(product_prefix)
  }
}