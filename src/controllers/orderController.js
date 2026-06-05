 const orderService = require('../services/orderService')

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.user.userId)
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.user.userId)
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await orderService.updateStatus(parseInt(req.params.id), status)
    res.json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getPurchasedProducts = async (req, res) => {
  try {
    const products = await orderService.getPurchasedProducts(req.user.userId)
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createOrder, getMyOrders, updateStatus, getPurchasedProducts }