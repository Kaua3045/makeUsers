const { client } = require('../../database/connection')
const Product = require('../../models/product')
const ProductImage = require('../../models/productImage')

module.exports = {
  async getAllProductAndImages() {
    const productsDatabase = await client.query(`
    SELECT 
    products.*,
    products_images.id AS imageId,
    products_images.name AS imageName,
    products_images.product_id AS productImgId
    FROM products INNER JOIN products_images 
    ON products.id = products_images.product_id`)

    const products = productsDatabase.rows.map(products => {
      const urlImage = `${process.env.APP_API_URL}/files/${products.imagename}`
      const productImage = new ProductImage(products.imagename, products.id)
      productImage.id = products.imageid
      productImage.url = urlImage

      const product = new Product(
        products.name,
        products.description,
        products.price,
        products.amount
      )
      product.id = products.id
      product.productsImages = productImage
        
      return product
    })

    return products
  }
}