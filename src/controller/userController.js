const User = require('../models/user')
const { getAllUsers, create, deleteUser } = require('../services/userService')

module.exports = {
  async getAllUsersController(req, res) {
    const result = await getAllUsers()
    return res.json(result)
  },

  async createUserController(req, res) {
    const { name, email, password } = req.body

    const user = new User(name, email, password)

    const result = await create(user)

    return res.status(200).json(result)
  },

  async deleteUserController(req, res) {
    const { id } = req.params
    await deleteUser(id)

    return res.status(200).json({ message: `id deletado ${id}`})
  }
}