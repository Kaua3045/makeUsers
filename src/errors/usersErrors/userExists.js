class UserExistsError extends Error {
  constructor() {
    super()
    this.name = 'user'
    this.message = 'User already exists'
    this.statusCode = 400
  }
}

module.exports = UserExistsError