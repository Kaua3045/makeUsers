const { client } = require('../../database/connection')
const AppError = require('../../errors/appError')

module.exports = {
  async getUserById(id) {
    const { rows } = await client.query('SELECT id, name, email, avatar_url FROM users WHERE id = $1', [ id ])
    const user = rows[0]

    if (!user) {
      throw new AppError('User does not exist!')
    }

    return user
  }
}