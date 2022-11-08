const jwt = require('jsonwebtoken')

module.exports = {
  isAdmin(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    const emailToUpdateAdmin = req.body

    if (!token) {
      return res.status(401).json({ auth: false, message: 'No token provided' })
    }

    try {
      const tokenVerified = jwt.verify(token, process.env.SECRET)

      if (tokenVerified.user.admin === false) {
        return res.status(400).json({ message: 'You do not have permission to access this'})
      }

      if (tokenVerified.user.email === emailToUpdateAdmin.email) {
        return res.status(400).json({ message: 'You can not do that' })
      }

      next()
    } catch (error) {
      res.status(400).json({ message: 'Token invalid'})
    }
  }
}