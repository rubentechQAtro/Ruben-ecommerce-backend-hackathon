 const paymentService = require('../services/paymentService')

const createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body
    const result = await paymentService.createPaymentIntent(parseInt(orderId), req.user.userId)
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const confirmOrderPayment = async (req, res) => {
  try {
    const { orderId } = req.body
    const order = await paymentService.confirmPayment(parseInt(orderId))
    res.json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature']
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    const orderId = parseInt(paymentIntent.metadata.orderId)
    await paymentService.confirmPayment(orderId)
  }

  res.json({ received: true })
}

module.exports = { createPaymentIntent, confirmOrderPayment, stripeWebhook }