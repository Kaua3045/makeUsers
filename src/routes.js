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

routes.get('/', auth, getAllUsersController)
routes.get('/:id', getUserByIdController)
routes.post('/create', createUserController)
routes.put('/update/:id', auth, updateUserController)
routes.put('/resetpassword/:id', resetPasswordUserController)
routes.delete('/delete/:id', auth, deleteUserController)

routes.post('/auth', loginController)

module.exports = routes