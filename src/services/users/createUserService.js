const bcrypt = require('bcrypt')
const { client } = require('../../database/connection')
const AppError = require('../../errors/appError')
const User = require('../../models/user')

module.exports = {
  async createUser(user) {
    const { rows } = await client.query('SELECT email FROM users WHERE email = $1', [ user.email ])
    const userExists = rows[0];

    if (!userExists) {
      const encryptedPassword = await bcrypt.hash(user.password, 8);

      const userCreated = new User(user.name, user.email, encryptedPassword)
        
      await client.query(`
      INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)`,
      [userCreated.id, userCreated.name, userCreated.email, encryptedPassword])

      return userCreated
    } else {
     throw new AppError('User already exists!')
    }
  }
}