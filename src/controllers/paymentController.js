const paymentService = require('../services/paymentService')

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body
    const result = await paymentService.createPaymentIntent(amount, currency)
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { createPaymentIntent }