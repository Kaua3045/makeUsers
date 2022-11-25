const UserRepository = require('../../repositories/users/userRepository')

module.exports = {
  async getAllUsers() {
    const userRepository = new UserRepository()

    const users = await userRepository.findAllUsers()

    return users
  }
}