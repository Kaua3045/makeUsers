const { client } = require('../../database/connection')
const UserNotExistsError = require('../../errors/usersErrors/userNotExists')
const { deleteFile, saveFile } = require('../../database/diskStorage')
const { avatarsFolder } = require('../../config/uploadConfig')

module.exports = {
  async updateUserAvatar(id, avaterFilename) {
    const { rows } = await client.query('SELECT id, avatar FROM users WHERE id = $1', [id])
    const userExists = rows[0]

    if (!userExists) {
      throw new UserNotExistsError()
    }

    if (userExists.avatar) {
      await deleteFile(userExists.avatar, avatarsFolder)
    }

    const avatarFile = await saveFile(avaterFilename, avatarsFolder)

    userExists.avatar = avatarFile
    avatar = `${process.env.APP_API_URL}/files/${avatarFile}`
    
    await client.query('UPDATE users SET avatar = $1 WHERE id = $2', [userExists.avatar, id])
    
    return avatar
  }
}