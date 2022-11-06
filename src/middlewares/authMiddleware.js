const jwt = require('jsonwebtoken')

module.exports = {
  auth(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ auth: false, message: 'No token provided' })
    }

    try {
      jwt.verify(token, process.env.SECRET)

      next()
    } catch (error) {
      res.status(400).json({ mensagem: 'Token invalid'})
    }
  }
}