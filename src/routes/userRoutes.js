const express = require('express')
const userRouter = express.Router()

const { 
  getAllUsersController, 
  getUserByIdController, 
  createUserController, 
  updateUserController, 
  resetPasswordUserController, 
  deleteUserController, 
  updateUserAvatarController
} = require('../controller/userController')

const { auth } = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')

userRouter.get('/all', auth, getAllUsersController)
userRouter.get('/', auth, getUserByIdController)

userRouter.post('/users/create', createUserController)
userRouter.patch('/users/update', auth, updateUserController)
userRouter.patch('/users/resetpassword/:id', resetPasswordUserController)
userRouter.delete('/users/delete/:id', auth, deleteUserController)

userRouter.patch('/users/avatar', auth, upload.single('avatar'), updateUserAvatarController)

module.exports = userRouter