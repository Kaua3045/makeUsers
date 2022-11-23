const express = require('express')
const authRouter = express.Router()
const { loginController } = require('../controller/authController')

authRouter.post('/', loginController)

module.exports = authRouter