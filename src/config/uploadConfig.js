const path = require('path')

const tmpFolder = path.resolve(__dirname, '../../tmp/')
const avatarsFolder = path.resolve(tmpFolder, 'avatars')
const imagesProductsFolder = path.resolve(tmpFolder, 'imagesProducts')

module.exports = {
  tmpFolder,
  avatarsFolder,
  imagesProductsFolder
}