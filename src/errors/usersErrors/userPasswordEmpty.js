class UserPasswordEmptyError extends Error {
  constructor() {
    super()
    this.name = 'user'
    this.message = 'password cannot be empty'
    this.statusCode = 400
  }
}

module.exports = UserPasswordEmptyError