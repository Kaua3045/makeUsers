const ProductImage = require('../../../models/productImage')
const ProductImageRepository = require('../../../repositories/products/productImageRepository')

module.exports = {
  async getProductImagesUrl(product_id) {
    const productImageRepository = new ProductImageRepository()
    const productImagesRows = await productImageRepository.findAllImageWithProductId(product_id)

    const imagesUrl = productImagesRows.map(url => {
      const productImages = new ProductImage(url.name, product_id)
      productImages.id = url.id
      productImages.url = ProductImage.getProductImageUrl(url.name)
      
      return productImages
    })

    return imagesUrl
  }
}