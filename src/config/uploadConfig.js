const path = require('path')

const tmpFolder = path.resolve(__dirname, '../../tmp/')
const uploadsFolder = path.resolve(tmpFolder, 'uploads')

module.exports = {
  tmpFolder,
  uploadsFolder
}