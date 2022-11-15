const fs = require('fs')
const path = require('path')

const { tmpFolder, uploadsFolder} = require('../config/uploadConfig')
const AppError = require('../errors/appError')

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
      throw new AppError(error.message, null, 500)
    }

    await fs.promises.unlink(filePath)
  }
}