const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const { authMiddleware } = require('../middlewares/auth')

router.get('/', authMiddleware, cartController.getCart)
router.post('/items', authMiddleware, cartController.addItem)
router.put('/items/:productId', authMiddleware, cartController.updateQuantity)
router.delete('/items/:productId', authMiddleware, cartController.removeItem)

module.exports = router