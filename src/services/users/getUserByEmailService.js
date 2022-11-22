const { client } = require("../../database/connection")
const UserNotExistsError = require("../../errors/usersErrors/userNotExists")
const User = require("../../models/user")

module.exports = {
  async getUserByEmail(email) {
    const { rows } = await client.query('SELECT * FROM users where email = $1', [email])
    const userDatabase = rows[0]

    if (!userDatabase) {
      throw new UserNotExistsError()
    }

    const user = new User(userDatabase.name, userDatabase.email, userDatabase.password)
    user.id = userDatabase.id
    user.isAdmin = userDatabase.admin
    user.avatar = user.getAvatarUrl(userDatabase.avatar)

    return user
  }
}