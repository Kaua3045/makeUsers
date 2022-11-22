const { client } = require('../../database/connection')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')

module.exports = {
  async deleteUser(id) {
    const { rows } = await client.query('SELECT id FROM users WHERE id = $1', [ id ])
    const usersExists = rows[0];

    if (!usersExists) {
      throw new UserNotExistsError()
    }

    await client.query('DELETE FROM users WHERE id = $1', [id])
  }
}