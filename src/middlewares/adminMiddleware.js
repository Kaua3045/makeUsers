const jwt = require('jsonwebtoken')
const TokenMissingError = require('../errors/tokensErrors/tokenMissingError')
const InvalidTokenError = require('../errors/tokensErrors/invalidTokenError')

module.exports = {
  isAdmin(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    const emailToUpdateAdmin = req.body

    if (!token) {
      throw new TokenMissingError()
    }

    try {
      const tokenVerified = jwt.verify(token, process.env.SECRET)

      if (tokenVerified.userFind.isAdmin === false) {
        return res.status(403).json({ message: 'You do not have permission to access this'})
      }

      if (tokenVerified.userFind.email === emailToUpdateAdmin.email) {
        return res.status(403).json({ message: 'You can not do that' })
      }

      return next()
    } catch (error) {
      throw new InvalidTokenError()
    }
  }
}