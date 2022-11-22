class ImageNotExistsError extends Error {
  constructor() {
    super() 
    this.name = 'image'
    this.message = 'Image does not exists'
    this.statusCode = 400
  }
}

module.exports = ImageNotExistsError