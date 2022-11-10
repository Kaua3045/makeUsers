const User = require('../models/user')
const { 
  getAllUsers, 
  createUser, 
  deleteUser, 
  updateUser, 
  resetPasswordUser, 
  getUserById, 
  updateUserAvatar
} = require('../services/users')

module.exports = {
  async getAllUsersController(req, res) {
    const result = await getAllUsers()
    return res.json(result)
  },

  async getUserByIdController(req, res) {
    const result = await getUserById(req.user.id)

    return res.json(result)
  },

  async createUserController(req, res) {
    const { name, email, password } = req.body

    const user = new User(name, email, password)

    const result = await createUser(user)

    return res.status(201).json(result)
  },

  async deleteUserController(req, res) {
    const { id } = req.params
    await deleteUser(id)

    return res.status(204).end()
  },

  async updateUserController(req, res) {
    const user = req.body
    await updateUser(req.user.id, user)

    return res.status(204).end()
  },

  async updateUserAvatarController(req, res) {
    const id = req.user.id
    const fileName = req.file.filename
    const user = await updateUserAvatar(id, fileName)

    return res.json(user)
  },

  async resetPasswordUserController(req, res) {
    const { id } = req.params
    const { newPassword } = req.body
    await resetPasswordUser(id, newPassword)

    return res.status(204).end()
  }
}