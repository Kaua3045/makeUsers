const express = require('express')
const router = express.Router()

const userRouter = require('./userRoutes')
const authRouter = require('./authRoutes')
const adminRouter = require('./adminRoutes')
const productRouter = require('./productRoutes')

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/product', productRouter)

module.exports = router