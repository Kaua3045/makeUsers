const jwt = require('jsonwebtoken')
const AppError = require('../errors/appError')

module.exports = {
  isAdmin(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    const emailToUpdateAdmin = req.body

    if (!token) {
      throw new AppError('Token is missing', null, 401)
    }

    try {
      const tokenVerified = jwt.verify(token, process.env.SECRET)

      if (tokenVerified.user.admin === false) {
        return res.status(403).json({ message: 'You do not have permission to access this'})
      }

      if (tokenVerified.user.email === emailToUpdateAdmin.email) {
        return res.status(403).json({ message: 'You can not do that' })
      }

      next()
    } catch (error) {
      throw new AppError('Invalid token', null, 401)
    }
  }
}