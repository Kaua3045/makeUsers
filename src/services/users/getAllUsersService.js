const { client } = require('../../database/connection')
const User = require('../../models/user')

module.exports = {
  async getAllUsers() {
    const { rows } = await client.query('SELECT id, name, email, password, avatar FROM users');
    const users = rows

    const usersUpdateds = users.map(users => {
      const user = new User(users.name, users.email, users.password)
      user.id = users.id
      user.avatar = user.getAvatarUrl(users.avatar)

      return user
    })

    return usersUpdateds
  }
}