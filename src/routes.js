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
const upload = require('./middlewares/uploadMiddleware')
const { createProductController, createProductImagesController } = require('./controller/productController')

routes.get('/all', auth, getAllUsersController)
routes.get('/', auth, getUserByIdController)
routes.post('/create', createUserController)
routes.put('/update', auth, updateUserController)
routes.put('/resetpassword/:id', resetPasswordUserController)
routes.delete('/delete/:id', auth, deleteUserController)

routes.post('/auth', loginController)

routes.put('/admin', isAdmin, updateAdminController)
routes.get('/admin/list', isAdmin, getAllAdminsController)

routes.patch('/avatar', auth, upload.single('avatar'), updateUserAvatarController)

routes.post('/product/create', createProductController)
routes.patch('/product/create/images/:id', upload.array('images'), createProductImagesController)

module.exports = routes