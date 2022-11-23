const fs = require('fs')
const path = require('path')

const { tmpFolder } = require('../config/uploadConfig')
const InternalServerError = require('../errors/serverErrors/internalServerError')

module.exports = {
  async saveFile(file, finalFolder) {
    await fs.promises.rename(
      path.resolve(tmpFolder, file),
      path.resolve(finalFolder, file)
    )

    return file
  },

  async deleteFile(file, finalFolder) {
    const filePath = path.resolve(finalFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch (error) {
      throw new InternalServerError()
    }

    await fs.promises.unlink(filePath)
  }
}