const { v4: uuid } = require('uuid')

class User {
  id
  name
  email
  password
  avatar
  isAdmin

  constructor(name, email, password) {
    if (!this.id) {
      this.id = uuid()
    }

    this.name = name
    this.email = email
    this.password = password
  }

  getAvatarUrl(avatarName) {
    return `${process.env.APP_API_URL}/files/${avatarName}`
  }
}

module.exports = User