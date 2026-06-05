 const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const prisma = require('../config/db')

const createPaymentIntent = async (orderId, userId) => {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId }
  })

  if (!order) throw new Error('Orden no encontrada')
  if (order.status === 'paid') throw new Error('Orden ya pagada')

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.total * 100),
    currency: 'pen',
    metadata: { orderId: order.id.toString() }
  })

  return { 
    clientSecret: paymentIntent.client_secret,
    orderId: order.id
  }
}

const confirmPayment = async (orderId) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status: 'paid' }
  })
}

module.exports = { createPaymentIntent, confirmPayment }