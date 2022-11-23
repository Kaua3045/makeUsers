class UserEmailInvalidError extends Error {
  constructor() {
    super()
    this.name = 'user'
    this.message = 'email invalid'
    this.statusCode = 400
  }
}

module.exports = UserEmailInvalidError