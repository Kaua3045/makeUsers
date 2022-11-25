const ProductImage = require('../../../models/productImage')
const ImageNotExistsError = require('../../../errors/imagesErrors/imageNotExists')
const ProductImageRepository = require('../../../repositories/products/productImageRepository')

module.exports = {
  async getProductImageById(id) {
    const productImageRepository = new ProductImageRepository()
    const imageExists = await productImageRepository.findById(id)

    if (!imageExists) {
      throw new ImageNotExistsError()
    }

    const productImage = new ProductImage(imageExists.name, imageExists.product_id)
    productImage.id = imageExists.id
    productImage.url = ProductImage.getProductImageUrl(imageExists.name)

    return productImage
  }
}