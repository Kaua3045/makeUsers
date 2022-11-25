const UserRepository = require('../../repositories/users/userRepository')
const { deleteFile, saveFile } = require('../../database/diskStorage')
const { avatarsFolder } = require('../../config/uploadConfig')

const User = require('../../models/user')

const UserNotExistsError = require('../../errors/usersErrors/userNotExists')

module.exports = {
  async updateUserAvatar(id, avaterFilename) {
    const userRepository = new UserRepository()

    const userExists = await userRepository.findById(id)

    if (!userExists) {
      throw new UserNotExistsError()
    }

    if (userExists.avatar) {
      await deleteFile(userExists.avatar, avatarsFolder)
    }

    const avatarFile = await saveFile(avaterFilename, avatarsFolder)

    userExists.avatar = avatarFile
    avatar = User.getAvatarUrl(avatarFile)
    
    await userRepository.update('avatar = $1', 'id = $2', [userExists.avatar, id])
    
    return avatar
  }
}