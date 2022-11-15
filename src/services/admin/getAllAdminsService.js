const { client } = require('../../database/connection')
const User = require('../../models/user')

module.exports = {
  async getAllAdmins() {
    const { rows } = await client.query('SELECT id, name, email, admin, avatar FROM users WHERE admin = $1', [1])
    const admins = rows

    const adminsUpdated = admins.map(admins => {
      const userAdmin = new User(admins.name, admins.email, admins.password)
      userAdmin.id = admins.id
      userAdmin.isAdmin = admins.admin
      userAdmin.avatar = userAdmin.getAvatarUrl(admins.avatar)

      return userAdmin
    })

    return adminsUpdated
  }
}