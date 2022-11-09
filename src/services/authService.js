const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { client } = require("../database/connection")
const AppError = require('../errors/appError')

module.exports = {
  async auth(email, password) {
    const { rows } = await client.query('SELECT * FROM users where email = $1', [email])
    const user = rows[0]
    const id = user.id

    const passwordIsValid = await bcrypt.compare(password, user.password)

    if (!passwordIsValid || !user) {
      throw new AppError('User does not exists!')
    }

    delete user.password

    const token = jwt.sign({ id, user }, process.env.SECRET, {
      expiresIn: '60m' // 60 minutos
    })

    return { user, token }
  }
}