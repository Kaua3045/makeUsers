const express = require('express')
const routes = express.Router()

const { 
  getAllUsersController, 
  createUserController, 
  deleteUserController, 
  updateUserController, 
  resetPasswordUserController, 
  getUserByIdController
} = require('./controller/userController')

const { loginController } = require('./controller/authController')
const { auth } = require('./middlewares/authMiddleware')
const { adminController } = require('./controller/adminController')
const { isAdmin } = require('./middlewares/adminMiddleware')

routes.get('/all', auth, getAllUsersController)
routes.get('/', auth, getUserByIdController)
routes.post('/create', createUserController)
routes.put('/update', auth, updateUserController)
routes.put('/resetpassword/:id', resetPasswordUserController)
routes.delete('/delete/:id', auth, deleteUserController)

routes.post('/auth', loginController)

routes.put('/admin', isAdmin, adminController)

module.exports = routes