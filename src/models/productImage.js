const { v4: uuid } = require('uuid')

class ProductImage {
  id
  name
  url
  product_id

  constructor(name, product_id) {
    if (!this.id) {
      this.id = uuid()
    }

    this.name = name
    this.product_id = product_id
  }

  static getProductImageUrl(name) {
    return `${process.env.APP_API_URL}/files/${name}`
  }
}

module.exports = ProductImage