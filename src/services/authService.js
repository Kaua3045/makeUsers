const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { client } = require("../database/connection")

module.exports = {
  async auth(email, password) {
    try {
      const { rows } = await client.query('SELECT * FROM users where email = $1', [email])
      const userExists = rows[0]
      const id = userExists.id

      const passwordIsValid = await bcrypt.compare(password, userExists.password)

      if (!passwordIsValid || !userExists) {
        return new Error('User does not exists!')
      }

      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: '60m' // 60 minutos
      })

      return token
    } catch (error) {
      return new Error(error)
    }
  }
}