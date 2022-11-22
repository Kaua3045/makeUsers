const fs = require('fs')
const path = require('path')

const { tmpFolder, uploadsFolder} = require('../config/uploadConfig')
const InternalServerError = require('../errors/serverErrors/internalServerError')

module.exports = {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(tmpFolder, file),
      path.resolve(uploadsFolder, file)
    )

    return file
  },

  async deleteFile(file) {
    const filePath = path.resolve(uploadsFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch (error) {
      throw new InternalServerError()
    }

    await fs.promises.unlink(filePath)
  }
}