const { client } = require('../../database/connection')

module.exports = {
  async getAllUsers() {
    const { rows } = await client.query('SELECT id, name, email FROM users');
    const users = rows

    return users
  }
}