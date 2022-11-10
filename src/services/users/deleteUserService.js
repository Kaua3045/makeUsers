const { client } = require('../../database/connection')
const AppError = require('../../errors/appError')

module.exports = {
  async delete(id) {
    const { rows } = await client.query('SELECT id FROM users WHERE id = $1', [ id ])
    const usersExists = rows[0];

    if (!usersExists) {
      throw new AppError('User does not exists!')
    }

    await client.query('DELETE FROM users WHERE id = $1', [id])
  }
}