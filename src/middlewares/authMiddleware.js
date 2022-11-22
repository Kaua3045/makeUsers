const jwt = require('jsonwebtoken')
const TokenMissingError = require('../errors/tokensErrors/tokenMissingError')
const InvalidTokenError = require('../errors/tokensErrors/invalidTokenError')

module.exports = {
  auth(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      throw new TokenMissingError()
    }

    try {
      const userData = jwt.verify(token, process.env.SECRET)
            
      req.user ={
        id: userData.id
      }

      return next()
    } catch (error) {
      throw new InvalidTokenError()
    }
  }
}