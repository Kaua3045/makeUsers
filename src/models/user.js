const { v4: uuid } = require('uuid')

class User {
  id
  name
  email
  password

  constructor(name, email, password) {
    if (!this.id) {
      this.id = uuid()
    }

    this.name = name
    this.email = email
    this.password = password
  }
}

module.exports = User