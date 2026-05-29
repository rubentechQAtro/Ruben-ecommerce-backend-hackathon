const cartService = require('../services/cartService')

const getCart = async (req, res) => {
  try {
    const cart = await cartService.getOrCreateCart(req.user.userId)
    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const addItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const item = await cartService.addItem(req.user.userId, productId, quantity)
    res.status(201).json(item)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body
    const productId = parseInt(req.params.productId)
    const item = await cartService.updateQuantity(req.user.userId, productId, quantity)
    res.json(item)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const removeItem = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId)
    const result = await cartService.removeItem(req.user.userId, productId)
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { getCart, addItem, updateQuantity, removeItem }
