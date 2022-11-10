const { client } = require('../../database/connection')

module.exports = {
  async getAllAdmins() {
    const { rows } = await client.query('SELECT id, name, email, admin, avatar_url FROM users WHERE admin = $1', [1])
    const admins = rows

    return admins
  }
}