class NotAdminError extends Error {
  constructor() {
    super()
    this.name = 'admin'
    this.message = 'You do not have permission to access this'
    this.statusCode = 403
  }
}

module.exports = NotAdminError