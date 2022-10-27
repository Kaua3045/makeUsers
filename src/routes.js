const express = require('express')
const routes = express.Router()

const { 
  getAllUsersController, 
  createUserController, 
  deleteUserController, 
  updateUserController, 
  resetPasswordUserController 
} = require('./controller/userController')

routes.get('/', getAllUsersController)
routes.post('/create', createUserController)
routes.put('/update/:id', updateUserController)
routes.put('/resetpassword/:id', resetPasswordUserController)
routes.delete('/delete/:id', deleteUserController)

module.exports = routes