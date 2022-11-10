const { client } = require('../../database/connection')
const { urlAvatar } = require('../../database/diskStorage')
const AppError = require('../../errors/appError')

module.exports = {
  async getUserById(id) {
    const { rows } = await client.query('SELECT id, name, email, avatar FROM users WHERE id = $1', [ id ])
    const userDatabase = rows[0]

    if (!userDatabase) {
      throw new AppError('User does not exist!')
    }

    avatar_url = urlAvatar(userDatabase.avatar)

    const user = {avatar_url, ...userDatabase}

    return { user }
  }
}