const { client } = require('../../database/connection')
const AppError = require('../../errors/appError')
const { deleteFile, saveFile, urlAvatar } = require('../../database/diskStorage')

module.exports = {
  async updateUserAvatar(id, avaterFilename) {
    const { rows } = await client.query('SELECT id, avatar FROM users WHERE id = $1', [id])
    const userExists = rows[0]

    if (!userExists) {
      throw new AppError('User does not exists!')
    }

    if (userExists.avatar) {
      await deleteFile(userExists.avatar)
    }

    const avatarFile = await saveFile(avaterFilename)

    userExists.avatar = avatarFile
    avatar_url = urlAvatar(avatarFile)
    
    await client.query('UPDATE users SET avatar = $1 WHERE id = $2', [userExists.avatar, id])

    const user = {avatar_url, ...userExists}

    return { user }
  }
}