const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const { authMiddleware, adminMiddleware } = require('../middlewares/auth')

router.post('/', authMiddleware, orderController.createOrder)
router.get('/', authMiddleware, orderController.getMyOrders)
router.get('/my-products', authMiddleware, orderController.getPurchasedProducts)
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateStatus)

module.exports = router