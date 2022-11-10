const { client } = require('../../database/connection')
const { urlAvatar } = require('../../database/diskStorage')

module.exports = {
  async getAllAdmins() {
    const { rows } = await client.query('SELECT id, name, email, admin, avatar FROM users WHERE admin = $1', [1])
    const admins = rows

    const adminsUpdated = admins.map(admin => {
      avatar_url = urlAvatar(admin.avatar)
      delete admin.avatar
      return {admin, avatar_url}
    })

    return adminsUpdated
  }
}