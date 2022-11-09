const jwt = require('jsonwebtoken')
const AppError = require('../errors/appError')

module.exports = {
  auth(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      throw new AppError('Token is missing', null, 401)
    }

    try {
      jwt.verify(token, process.env.SECRET)

      next()
    } catch (error) {
      throw new AppError('Invalid token', null, 401)
    }
  }
}