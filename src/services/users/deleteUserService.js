const UserRepository = require('../../repositories/users/userRepository')
const { deleteFile } = require('../../database/diskStorage')
const { avatarsFolder } = require('../../config/uploadConfig')

const UserNotExistsError = require('../../errors/usersErrors/userNotExists')

module.exports = {
  async deleteUser(id) {
    const userRepository = new UserRepository()
    const userExists = await userRepository.findById(id)

    if (!userExists) {
      throw new UserNotExistsError()
    }

    await deleteFile(userExists.avatar, avatarsFolder)
    await userRepository.remove(id)
  }
}