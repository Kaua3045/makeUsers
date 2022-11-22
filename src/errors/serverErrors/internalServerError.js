class InternalServerError extends Error {
  constructor(message) {
    super()
    this.name = 'InternalServerError'
    this.message = message
    this.statusCode = 500
  }
}

module.exports = InternalServerError