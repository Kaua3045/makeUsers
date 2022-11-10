const { client } = require('../../database/connection')
const { urlAvatar } = require('../../database/diskStorage')

module.exports = {
  async getAllAdmins() {
    const { rows } = await client.query('SELECT id, name, email, admin, avatar FROM users WHERE admin = $1', [1])
    const admins = rows

    const adminsUpdated = admins.map(admins => {
      avatar_url = urlAvatar(admins.avatar)
      delete admins.avatar

      const admin = {avatar_url, ...admins}
      return { admin }
    })

    return adminsUpdated
  }
}