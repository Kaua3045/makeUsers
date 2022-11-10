const multer = require('multer')
const { v4: uuid } = require('uuid')

const { tmpFolder } = require('../config/uploadConfig')

module.exports = (multer({
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      const newFilename = `${uuid()}-${file.originalname}`
      cb(null, newFilename)
    }
  })
}))