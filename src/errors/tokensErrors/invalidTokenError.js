class InvalidTokenError extends Error {
  constructor() {
    super()
    this.name = 'token'
    this.message = 'Invalid token'
    this.statusCode = 401
  }
}

module.exports = InvalidTokenError