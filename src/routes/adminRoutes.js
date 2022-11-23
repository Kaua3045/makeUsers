const express = require('express')
const adminRouter = express.Router()

const { 
  getAllAdminsController, 
  updateAdminController 
} = require('../controller/adminController')
const { isAdmin } = require('../middlewares/adminMiddleware')

adminRouter.get('/list', isAdmin, getAllAdminsController)
adminRouter.put('/update', isAdmin, updateAdminController)

module.exports = adminRouter