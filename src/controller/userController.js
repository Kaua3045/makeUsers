const User = require('../models/user')
const { getAllUsers, create, deleteUser, updateUser, resetPasswordUser } = require('../services/userService')

module.exports = {
  async getAllUsersController(req, res) {
    const result = await getAllUsers()
    return res.json(result)
  },

  async createUserController(req, res) {
    const { name, email, password } = req.body

    const user = new User(name, email, password)

    const result = await create(user)

    if (result instanceof Error) {
      return res.status(400).json(result.message)
    }

    return res.status(200).json(result)
  },

  async deleteUserController(req, res) {
    const { id } = req.params
    const result = await deleteUser(id)

    if (result instanceof Error) {
      return res.status(400).json(result.message)
    }

    return res.status(204).end()
  },

  async updateUserController(req, res) {
    const { id } = req.params
    const user = req.body
    const result = await updateUser(id, user)

    if (result instanceof Error) {
      return res.status(400).json(result.message)
    }

    return res.status(204).end()
  },

  async resetPasswordUserController(req, res) {
    const { id } = req.params
    const { newPassword } = req.body
    const result = await resetPasswordUser(id, newPassword)

    if (result instanceof Error) {
      return res.status(400).json(result.message)
    }

    return res.status(204).end()
  }
}