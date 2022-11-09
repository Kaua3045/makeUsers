const { client } = require('../database/connection')
const AppError = require('../errors/appError')

module.exports = {
  async updateAdmin(email, admin) {
    const { rows } = await client.query('SELECT email, admin FROM users WHERE email = $1', [ email ])
    const userExists = rows[0]

    if (!userExists) {
      throw new AppError('User does not exists!')
    }

    await client.query('UPDATE users SET admin = $1 WHERE email = $2', [admin, email])
  }
}