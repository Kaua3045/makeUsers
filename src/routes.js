const express = require('express')
const routes = express.Router()

const { 
  getAllUsersController, 
  createUserController, 
  deleteUserController, 
  updateUserController, 
  resetPasswordUserController 
} = require('./controller/userController')

const { loginController } = require('./controller/authController')
const { auth } = require('./middlewares/authMiddleware')

routes.get('/', auth, getAllUsersController)
routes.post('/create', createUserController)
routes.put('/update/:id', auth, updateUserController)
routes.put('/resetpassword/:id', resetPasswordUserController)
routes.delete('/delete/:id', auth, deleteUserController)

routes.post('/auth', loginController)

module.exports = routes