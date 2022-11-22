const { client } = require('../../database/connection')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')

module.exports = {
  async updateUser(id, { ...rest }) {
    const { rows } = await client.query('SELECT * FROM users where id = $1', [ id ])
    const userExists = rows[0];

    if (!userExists) {
      throw new UserNotExistsError()
    }

    if (rest.email) {
      const userByEmail = await client.query('SELECT * FROM users WHERE email = $1', [rest.email])

      if (userByEmail.rows[0]) throw new AppError('Email already used')
    }

    const updatedUser = Object.assign(userExists, rest)
    await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [updatedUser.name, updatedUser.email, id])

    return updatedUser
  }
}