const UserRepository = require('../../repositories/users/userRepository')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')

module.exports = {
  async getUserById(id) {
    const userRepository = new UserRepository()

    const user = await userRepository.findById(id)

    if (!user) {
      throw new UserNotExistsError()
    }

    return user
  }
}