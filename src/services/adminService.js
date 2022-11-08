const { client } = require('../database/connection')

module.exports = {
  async updateAdmin(email, admin) {
    try {
      const { rows } = await client.query('SELECT email, admin FROM users WHERE email = $1', [ email ])
      const userExists = rows[0]

      if (!userExists) {
        return new Error('User does not exists!')
      }

      await client.query('UPDATE users SET admin = $1 WHERE email = $2', [admin, email])
    } catch (error) {
      return new Error(error)
    }
  }
}