class UserPasswordInvalidError extends Error {
  constructor() {
    super()
    this.name = 'user'
    this.message = 'Invalid password, must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter and 1 number'
    this.statusCode = 400
  }
}

module.exports = UserPasswordInvalidError