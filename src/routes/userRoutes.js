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

userRouter.post('/create', createUserController)
userRouter.patch('/update', auth, updateUserController)
userRouter.patch('/resetpassword/:id', resetPasswordUserController)
userRouter.delete('/delete/:id', auth, deleteUserController)

userRouter.patch('/avatar', auth, upload.single('avatar'), updateUserAvatarController)

module.exports = userRouter