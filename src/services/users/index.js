const { createUser } = require('./createUserService')
const { deleteUser } = require('./deleteUserService')
const { getAllUsers } = require('./getAllUsersService')
const { getUserById } = require('./getUserByIdService')
const { resetPasswordUser } = require('./resetPasswordUserService')
const { updateUserAvatar } = require('./updateAvatarUserService')
const { updateUser } = require('./updateProfileUserService')

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  resetPasswordUser,
  updateUserAvatar,
  updateUser
}