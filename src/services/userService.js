const bcrypt = require('bcrypt')
const { db } = require('../database/connection')

module.exports = {
  async getAllUsers() {
    try {
      const users = await db.many('SELECT id, name, email FROM users');

      return users
    } catch (error) {
      console.log(error)
    }
  },

  async create(name, email, password) {
    try {
      const userExists = await db.oneOrNone('SELECT email FROM users WHERE email = $1', email)

      if (userExists === null) {
        const encryptedPassword = await bcrypt.hash(password, 8);
        
        await db.none(`
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, encryptedPassword])

        return { name, email }
      } else {
        return 'User already exists'
      }
    } catch (error) {
      console.log(error)
    }
  },

  async deleteUser(id) {
    try {
      await db.query('DELETE FROM users WHERE id = $1', id)

      return true
    } catch (error) {
      console.log(error)
    }
  }
}