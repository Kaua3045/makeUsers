const User = require('../models/user')
const { 
  getAllUsers, 
  create, 
  deleteUser, 
  updateUser, 
  resetPasswordUser, 
  getUserById 
} = require('../services/userService')

module.exports = {
  async getAllUsersController(req, res) {
    const result = await getAllUsers()
    return res.json(result)
  },

  async getUserByIdController(req, res) {
    const { id } = req.params
    const result = await getUserById(id)

    return res.json(result)
  },

  async createUserController(req, res) {
    const { name, email, password } = req.body

    const user = new User(name, email, password)

    const result = await create(user)

    return res.status(201).json(result)
  },

  async deleteUserController(req, res) {
    const { id } = req.params
    await deleteUser(id)

    return res.status(204).end()
  },

  async updateUserController(req, res) {
    const { id } = req.params
    const user = req.body
    await updateUser(id, user)

    return res.status(204).end()
  },

  async resetPasswordUserController(req, res) {
    const { id } = req.params
    const { newPassword } = req.body
    await resetPasswordUser(id, newPassword)

    return res.status(204).end()
  }
}