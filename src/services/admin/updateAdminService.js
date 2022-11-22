const { client } = require('../../database/connection')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')

module.exports = {
  async updateAdmin(email, admin) {
    const { rows } = await client.query('SELECT email, admin FROM users WHERE email = $1', [ email ])
    const userExists = rows[0]

    if (!userExists) {
      throw new UserNotExistsError()
    }

    await client.query('UPDATE users SET admin = $1 WHERE email = $2', [admin, email])
  }
}