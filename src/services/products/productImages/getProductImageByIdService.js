const { client } = require('../../../database/connection')
const AppError = require('../../../errors/appError')

module.exports = {
  async getProductImageById(id) {
    const imageDatabase = await client.query('SELECT * FROM products_images WHERE id = $1', [id])
    const imageExists = imageDatabase.rows[0]

    if (!imageExists) {
      throw new AppError('Image does not exists!')
    }

    return imageExists
  }
}