class AppError extends Error {
  constructor(message, stack, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    this.stack = stack
  }
}

module.exports = AppError