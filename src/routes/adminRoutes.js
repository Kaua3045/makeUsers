const express = require('express')
const adminRouter = express.Router()

const { 
  getAllAdminsController, 
  updateAdminController 
} = require('../controller/adminController')
const { isAdmin } = require('../middlewares/adminMiddleware')
const { auth } = require('../middlewares/authMiddleware')

adminRouter.get('/list', auth, isAdmin, getAllAdminsController)
adminRouter.put('/update', auth, isAdmin, updateAdminController)

module.exports = adminRouter