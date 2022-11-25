const ProductRepository = require('../../../repositories/products/productRepository')
const ProductImageRepository = require('../../../repositories/products/productImageRepository')

const { saveFile } = require('../../../database/diskStorage')
const { invalidatePrefix } = require('../../../database/redis')

const { product_prefix } = require('../../../config/redisPrefixes')
const { imagesProductsFolder } = require('../../../config/uploadConfig')

const ProductImage = require("../../../models/productImage")

module.exports = {
  async createProductImages(productImages, id) {
    const productRepository = new ProductRepository()
    const productImageRepository = new ProductImageRepository()

    const productExists = await productRepository.findById(id)

    if (productExists) { 
      const imagesMap = productImages.name.map(images => {
        return images.filename
      })

      for (let i = 0; i < imagesMap.length; i++) {
        const imageFile = await saveFile(imagesMap[i], imagesProductsFolder)
        const productImagesCreated = new ProductImage(imageFile, id)

        await productImageRepository.create(productImagesCreated)
      }

      await invalidatePrefix(product_prefix)
    }
  }
}