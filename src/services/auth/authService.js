const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { client } = require("../../database/connection")
const AppError = require('../../errors/appError')
const User = require('../../models/user')

module.exports = {
  async auth(email, password) {
    const { rows } = await client.query('SELECT * FROM users where email = $1', [email])
    const userDatabase = rows[0]
    const id = userDatabase.id

    const passwordIsValid = await bcrypt.compare(password, userDatabase.password)

    if (!passwordIsValid || !userDatabase) {
      throw new AppError('User does not exists!')
    }
    
    const user = new User(userDatabase.name, userDatabase.email, userDatabase.password)
    user.id = userDatabase.id
    user.isAdmin = userDatabase.admin
    user.avatar = user.getAvatarUrl(userDatabase.avatar)

    delete user.password
    
    const token = jwt.sign({ id, user }, process.env.SECRET, {
      expiresIn: '60m' // 60 minutos
    })

    return { user, token }
  }
}