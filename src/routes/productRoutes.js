const express = require('express')
const productRouter = express.Router()

const { 
  getAllProductController, 
  getProductByIdController, 
  getProductImageByIdController, 
  getAllProductImagesController, 
  createProductImagesController, 
  createProductController, 
  deleteProductController, 
  deleteProductImageController 
} = require('../controller/productController')

const { isAdmin } = require('../middlewares/adminMiddleware')
const { auth } = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')

productRouter.get('/', getAllProductController)
productRouter.get('/:id', getProductByIdController)
productRouter.get('/image/:id', getProductImageByIdController)
productRouter.get('/:id/images', getAllProductImagesController)

productRouter.post('/create', auth, isAdmin, createProductController)
productRouter.patch('/create/images/:id', auth, isAdmin, upload.array('images'), createProductImagesController)

productRouter.delete('/delete/:id', auth, isAdmin, deleteProductController)
productRouter.delete('/delete/image/:id', auth, isAdmin, deleteProductImageController)

module.exports = productRouter