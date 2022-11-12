const { v4: uuid } = require('uuid')

class Product {
  id
  name
  description
  price
  amount

  constructor(name, description, price, amount) {
    if (!this.id) {
      this.id = uuid()
    }

    this.name = name
    this.description = description
    this.price = price
    this.amount = amount
  }
}

module.exports = Product