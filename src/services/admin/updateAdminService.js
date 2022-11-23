const { client } = require('../../database/connection')
const { getUserById } = require('../users/getUserByIdService')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')
const NotUpdateYouAdminError = require('../../errors/adminErrors/notUpdateYouAdmin')

module.exports = {
  async updateAdmin(adminLogged, email, admin) {
    const { rows } = await client.query('SELECT email, admin FROM users WHERE email = $1', [ email ])
    const userExists = rows[0]

    if (!userExists) {
      throw new UserNotExistsError()
    }

    const userLogged = await getUserById(adminLogged)

    if (userLogged.email === email) {
      throw new NotUpdateYouAdminError()
    }

    await client.query('UPDATE users SET admin = $1 WHERE email = $2', [admin, email])
  }
}