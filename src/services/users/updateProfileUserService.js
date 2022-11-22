const { client } = require('../../database/connection')
const { getUserByEmail } = require('./getUserByEmailService')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')
const UserEmailExistsError = require('../../errors/usersErrors/userEmailExists')

module.exports = {
  async updateUser(id, { ...rest }) {
    const { rows } = await client.query('SELECT * FROM users where id = $1', [ id ])
    const userExists = rows[0];

    if (!userExists) {
      throw new UserNotExistsError()
    }

    if (rest.email) {
      const userByEmail = await getUserByEmail(rest.email)

      if (userByEmail) throw new UserEmailExistsError()
    }

    const updatedUser = Object.assign(userExists, rest)
    await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [updatedUser.name, updatedUser.email, id])

    return updatedUser
  }
}