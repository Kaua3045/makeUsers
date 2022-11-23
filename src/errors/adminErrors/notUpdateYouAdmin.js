class NotUpdateYouAdminError extends Error {
  constructor() {
    super()
    this.name = 'admin'
    this.message = 'Cannot update your own admin user'
    this.statusCode = 400
  }
}

module.exports = NotUpdateYouAdminError