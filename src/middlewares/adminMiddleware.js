const { getUserById } = require('../services/users/getUserByIdService')
const NotAdminError = require('../errors/adminErrors/notAdmin')

module.exports = {
  async isAdmin(req, res, next) {
    const userId = req.user.id

    const { isAdmin } = await getUserById(userId)

    if (isAdmin === false) {
      throw new NotAdminError()
    }

    return next()
  }
}