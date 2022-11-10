const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { client } = require("../../database/connection")
const { urlAvatar } = require('../../database/diskStorage')
const AppError = require('../../errors/appError')

module.exports = {
  async auth(email, password) {
    const { rows } = await client.query('SELECT * FROM users where email = $1', [email])
    const userDatabase = rows[0]
    const id = userDatabase.id

    const passwordIsValid = await bcrypt.compare(password, userDatabase.password)

    if (!passwordIsValid || !userDatabase) {
      throw new AppError('User does not exists!')
    }
    
    avatar_url = urlAvatar(userDatabase.avatar)

    delete userDatabase.password
    delete userDatabase.avatar
    
    const user = {avatar_url, ...userDatabase}

    const token = jwt.sign({ id, user }, process.env.SECRET, {
      expiresIn: '60m' // 60 minutos
    })

    return { user, token }
  }
}