const bcrypt = require('bcrypt')

const User = require('../../models/user')
const UserRepository = require('../../repositories/users/userRepository')
const { validateAllUserData } = require('../../validators/validation')

const UserExistsError = require('../../errors/usersErrors/userExists')

module.exports = {
  async createUser(user) {
    const userRepository = new UserRepository()

    validateAllUserData(user.name, user.email, user.password)
    
    const userExists = await userRepository.findByEmail(user.email)
    
    if (userExists) {
      throw new UserExistsError()
    }

    const encryptedPassword = await bcrypt.hash(user.password, 8);

    const userCreated = new User(user.name, user.email, encryptedPassword)
    userCreated.id = user.id

    const result = await userRepository.create(userCreated)

    return result
  }
}