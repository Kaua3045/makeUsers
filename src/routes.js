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

const { 
  createProductController, 
  createProductImagesController, 
  getProductByIdController, 
  deleteProductController,
  deleteProductImageController,
  getProductImageByIdController,
  getAllProductController,
  getAllProductImagesController
} = require('./controller/productController')

const { loginController } = require('./controller/authController')
const { auth } = require('./middlewares/authMiddleware')
const { updateAdminController, getAllAdminsController } = require('./controller/adminController')
const { isAdmin } = require('./middlewares/adminMiddleware')
const upload = require('./middlewares/uploadMiddleware')

routes.get('/users/all', auth, getAllUsersController)
routes.get('/users/', auth, getUserByIdController)
routes.post('/users/create', createUserController)
routes.patch('/users/update', auth, updateUserController)
routes.patch('/users/resetpassword/:id', resetPasswordUserController)
routes.delete('/users/delete/:id', auth, deleteUserController)

routes.patch('/users/avatar', auth, upload.single('avatar'), updateUserAvatarController)

routes.post('/auth', loginController)

routes.put('/admin', isAdmin, updateAdminController)
routes.get('/admin/list', isAdmin, getAllAdminsController)

routes.get('/product', getAllProductController)
routes.get('/product/:id', getProductByIdController)
routes.get('/product/image/:id', getProductImageByIdController)
routes.get('/product/:id/images', getAllProductImagesController)

routes.post('/product/create', isAdmin, createProductController)
routes.patch('/product/create/images/:id', isAdmin, upload.array('images'), createProductImagesController)

routes.delete('/product/delete/:id', isAdmin, deleteProductController)
routes.delete('/product/delete/image/:id', isAdmin, deleteProductImageController)

module.exports = routes