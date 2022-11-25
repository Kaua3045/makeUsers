const { client } = require("../../database/connection");
const User = require("../../models/user");

class AdminRepository {
  async findAllAdmins() {
    const adminsDatabase = await client.query(`
    SELECT id, name, email, admin, avatar
    FROM users WHERE admin = $1`, [1])

    const admins = adminsDatabase.rows.map(admin => {
      admin.avatar_url = User.getAvatarUrl(admin.avatar)
      return admin
    })

    return admins
  }

  async findAdminByEmail(email) {
    const adminDatabase = await client.query('SELECT id, name, email, admin, avatar FROM users WHERE email = $1', [email])
    const admin = adminDatabase.rows[0]

    if (!admin || !admin.avatar) return admin

    admin.avatar_url = User.getAvatarUrl(admin.avatar)

    return admin
  }

  async updateAdmin(email, admin) {
    await client.query('UPDATE users SET admin = $1 WHERE email = $2', [admin, email])
  }
}

module.exports = AdminRepository