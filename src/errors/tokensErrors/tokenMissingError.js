class TokenMissingError extends Error {
  constructor() {
    super()
    this.name = 'token'
    this.message = 'Token is missing'
    this.statusCode = 401
  }
}

module.exports = TokenMissingError