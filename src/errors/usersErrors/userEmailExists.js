class UserEmailExistsError extends Error {
  constructor() {
    super()
    this.name = 'user'
    this.message = 'Email already used'
    this.statusCode = 400
  }
}

module.exports = UserEmailExistsError