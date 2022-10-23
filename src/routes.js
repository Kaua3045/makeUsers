const express = require('express')
const routes = express.Router()

const { getAllUsersController, createUserController, deleteUserController } = require('./controller/userController')

routes.get('/', getAllUsersController)
routes.post('/create', createUserController)
routes.delete('/delete/:id', deleteUserController)

module.exports = routes