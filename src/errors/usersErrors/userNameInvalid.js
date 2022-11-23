class UserNameInvalidError extends Error {
  constructor() {
    super()
    this.name = 'user'
    this.message = 'name cannot be empty'
    this.statusCode = 400
  }
}

module.exports = UserNameInvalidError