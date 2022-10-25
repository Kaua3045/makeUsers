const bcrypt = require('bcrypt')
const { client } = require('../database/connection');
const User = require('../models/user');

module.exports = {
  async getAllUsers() {
    try {
      const { rows } = await client.query('SELECT id, name, email FROM users');
      const users = rows

      return users
    } catch (error) {
      return new Error(error)
    }
  },

  async create(user) {
    try {
      const { rows } = await client.query('SELECT email FROM users WHERE email = $1', [ user.email ])
      const userExists = rows[0];

      if (!userExists) {
        const encryptedPassword = await bcrypt.hash(user.password, 8);

        const userCreated = new User(user.name, user.email, encryptedPassword)
        
        await client.query(`
        INSERT INTO user (id, name, email, password) VALUES ($1, $2, $3, $4)`,
        [userCreated.id, userCreated.name, userCreated.email, encryptedPassword])

        return userCreated
      } else {
        return new Error('User alredy exists!')
      }
    } catch (error) {
      return new Error(error)
    }
  },

  async deleteUser(id) {
    try {
      const { rows } = await client.query('SELECT id FROM users WHERE id = $1', [ id ])
      const usersExists = rows[0];

      if (!usersExists) {
        return new Error('User does not exists!')
      }

      await client.query('DELETE FROM users WHERE id = $1', [id])
    } catch (error) {
      return new Error(error)
    }
  }
}