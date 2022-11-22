class UserNotExistsError extends Error {
  constructor() {
    super()
    this.name = 'user'
    this.message = 'User does not exists'
    this.statusCode = 400
  }
}

module.exports = UserNotExistsError