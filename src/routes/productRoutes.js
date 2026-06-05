const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { authMiddleware } = require('../middlewares/auth')

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/',authMiddleware, productController.create)
router.put('/:id', authMiddleware, productController.update)
router.delete('/:id',[authMiddleware], productController.remove)

module.exports = router