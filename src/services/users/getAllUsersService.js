const { client } = require('../../database/connection');
const { urlAvatar } = require('../../database/diskStorage');

module.exports = {
  async getAllUsers() {
    const { rows } = await client.query('SELECT id, name, email, avatar FROM users');
    const users = rows

    const usersUpdateds = users.map(users => {
      avatar_url = urlAvatar(users.avatar)

      delete users.avatar

      const user = {avatar_url, ...users}
      return { user }
    })

    return usersUpdateds
  }
}