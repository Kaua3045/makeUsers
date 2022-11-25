const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')
const UserRepository = require('../../repositories/users/userRepository')

module.exports = {
  async auth(email, password) {
    const userRepository = new UserRepository()

    const userFind = await userRepository.findByEmail(email)

    if (!userFind) throw new UserNotExistsError()

    const passwordIsValid = await bcrypt.compare(password, userFind.password)

    if (!passwordIsValid) {
      throw new UserNotExistsError()
    }

    delete userFind.password
    
    const token = jwt.sign({ id: userFind.id }, process.env.SECRET, {
      expiresIn: '60m' // 60 minutos
    })

    return { userFind, token }
  }
}