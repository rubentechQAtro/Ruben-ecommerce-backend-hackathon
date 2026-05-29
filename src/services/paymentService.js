// Stripe real comentado porque pide verificación
// const Stripe = require('stripe')
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

 const createPaymentIntent = async (amount, currency = 'usd') => {
  // simulación porque Stripe me pide verificación de empresa y toma dias 
  return { 
    clientSecret: `demo_secret_${Date.now()}_${Math.round(amount)}`,
    amount: amount,
    currency: currency,
    status: "simulated"
  }
}

module.exports = { createPaymentIntent }