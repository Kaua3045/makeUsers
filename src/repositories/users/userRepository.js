const { client } = require('../../database/connection')
const User = require('../../models/user')

class UserRepository {
  async findAllUsers() {
    const usersDatabase = await client.query('SELECT id, name, email, password, avatar FROM users')

    const users = usersDatabase.rows.map(userMap => {
      userMap.avatar = User.getAvatarUrl(userMap.avatar)

      return userMap
    })

    return users
  }

  async findById(id) {
    const userDatabase = await client.query('SELECT * FROM users WHERE id = $1', [id])
    const user = userDatabase.rows[0]

    if (!user || !user.avatar) return user

    user.avatar_url = User.getAvatarUrl(user.avatar)

    return user
  }

  async findByEmail(email) {
    const userDatabase = await client.query('SELECT * FROM users WHERE email = $1', [email])
    const user = userDatabase.rows[0]

    if (!user || !user.avatar) return user

    user.avatar_url = User.getAvatarUrl(user.avatar)

    return user
  }

  async create(user) {
    const userDatabase = await client.query(`
    INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) 
    RETURNING id, name, email, password`,
    [
      user.id,
      user.name,
      user.email,
      user.password
    ])

    const userCreated = userDatabase.rows[0]

    return userCreated
  }

  async update(columnsToUpdate, whereIdentify, values) {
    await client.query(`
    UPDATE users SET ${columnsToUpdate} WHERE ${whereIdentify}`, values)
  }

  async remove(id) {
    await client.query('DELETE FROM users WHERE id = $1', [id])
  }
}

module.exports = UserRepository