const bcrypt = require('bcrypt')
const UserRepository = require('../../repositories/users/userRepository')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')
const { passwordValid } = require('../../validators/userValidators')

module.exports = {
  async resetPasswordUser(id, newPassword) {
    const userRepository = new UserRepository()
    const userExists = await userRepository.findById(id)

    if (!userExists) {
      throw new UserNotExistsError()
    }

    passwordValid(newPassword)

    const updatedPassword = await bcrypt.hash(newPassword, 8)
    await userRepository.update('password = $1', 'id = $2', [updatedPassword, id])
  }
}