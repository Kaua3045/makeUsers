const { v4: uuid } = require('uuid')

class ProductImage {
  id
  name
  product_id

  constructor(name, product_id) {
    if (!this.id) {
      this.id = uuid()
    }

    this.name = name
    this.product_id = product_id
  }
}

module.exports = ProductImage