const express = require('express')
const routes = express.Router()

const { 
  getAllUsersController, 
  createUserController, 
  deleteUserController, 
  updateUserController, 
  resetPasswordUserController, 
  getUserByIdController,
  updateUserAvatarController
} = require('./controller/userController')

const { loginController } = require('./controller/authController')
const { auth } = require('./middlewares/authMiddleware')
const { updateAdminController, getAllAdminsController } = require('./controller/adminController')
const { isAdmin } = require('./middlewares/adminMiddleware')
const uploadAvatar = require('./middlewares/uploadMiddleware')

routes.get('/all', auth, getAllUsersController)
routes.get('/', auth, getUserByIdController)
routes.post('/create', createUserController)
routes.put('/update', auth, updateUserController)
routes.put('/resetpassword/:id', resetPasswordUserController)
routes.delete('/delete/:id', auth, deleteUserController)

routes.post('/auth', loginController)

routes.put('/admin', isAdmin, updateAdminController)
routes.get('/admin/list', isAdmin, getAllAdminsController)

routes.patch('/avatar', auth, uploadAvatar.single('avatar'), updateUserAvatarController)

module.exports = routes