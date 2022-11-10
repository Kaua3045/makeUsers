const { client } = require('../../database/connection')
const AppError = require('../../errors/appError')
const { deleteFile, saveFile } = require('../../database/diskStorage')

module.exports = {
  async updateUserAvatar(id, avaterFilename) {
    const { rows } = await client.query('SELECT id, avatar, avatar_url FROM users WHERE id = $1', [id])
    const userExists = rows[0]

    if (!userExists) {
      throw new AppError('User does not exists!')
    }

    if (userExists.avatar) {
      await deleteFile(userExists.avatar)
    }

    const avatarFile = await saveFile(avaterFilename)

    userExists.avatar = avatarFile
    userExists.avatar_url = `${process.env.APP_API_URL}/files/${avatarFile}`

    await client.query('UPDATE users SET avatar = $1, avatar_url = $2 WHERE id = $3', [userExists.avatar, userExists.avatar_url, id])

    return userExists
  }
}