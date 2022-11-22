const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { client } = require("../../database/connection")
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')
const User = require('../../models/user')
const { getUserByEmail } = require('../users/getUserByEmailService')

module.exports = {
  async auth(email, password) {
    const userFind = await getUserByEmail(email)

    const passwordIsValid = await bcrypt.compare(password, userFind.password)

    if (!passwordIsValid || !userFind) {
      throw new UserNotExistsError()
    }

    delete userFind.password
    const id = userFind.id
    
    const token = jwt.sign({ id, userFind }, process.env.SECRET, {
      expiresIn: '60m' // 60 minutos
    })

    return { userFind, token }
  }
}