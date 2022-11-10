const { client } = require('../../database/connection')
const AppError = require('../../errors/appError')

module.exports = {
  async resetPasswordUser(id, newPassword) {
    const { rows } = await client.query('SELECT password FROM users where id = $1', [ id ])
    const userExists = rows[0];

    if (!userExists) {
      throw new AppError('User does not exists!')
    }

    const updatedPassword = await bcrypt.hash(newPassword, 8)
    await client.query('UPDATE users SET password = $1', [updatedPassword])
  }
}