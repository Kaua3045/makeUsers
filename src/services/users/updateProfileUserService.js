const { client } = require('../../database/connection')
const { emailValid } = require('../../validators/userValidators')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')
const UserEmailExistsError = require('../../errors/usersErrors/userEmailExists')

module.exports = {
  async updateUser(id, { ...rest }) {
    const { rows } = await client.query('SELECT * FROM users where id = $1', [ id ])
    const userExists = rows[0]

    if (!userExists) {
      throw new UserNotExistsError()
    }

    if (rest.email) {
      emailValid(rest.email)

      const userByEmail = await client.query('SELECT id, email FROM users WHERE email = $1', [rest.email])

      if (userByEmail.rows[0]) throw new UserEmailExistsError()
    }

    if (rest.name.length === 0) {
      rest.name = userExists.name
    }

    const updatedUser = Object.assign(userExists, rest)
    await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [updatedUser.name, updatedUser.email, id])

    return updatedUser
  }
}