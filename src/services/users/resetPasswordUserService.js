const bcrypt = require('bcrypt')
const { client } = require('../../database/connection')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')

module.exports = {
  async resetPasswordUser(id, newPassword) {
    const { rows } = await client.query('SELECT password FROM users where id = $1', [ id ])
    const userExists = rows[0];

    if (!userExists) {
      throw new UserNotExistsError()
    }

    const updatedPassword = await bcrypt.hash(newPassword, 8)
    await client.query('UPDATE users SET password = $1', [updatedPassword])
  }
}