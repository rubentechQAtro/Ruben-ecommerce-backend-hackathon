 const prisma = require('../config/db')

const createOrder = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }
  })

  if (!cart || cart.items.length === 0) {
    throw new Error('Carrito vacío')
  }

  let total = 0
  const orderItems = cart.items.map(item => {
    const subtotal = item.product.price * item.quantity
    total += subtotal
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price
    }
  })

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      items: { create: orderItems }
    },
    include: { items: true }
  })

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })

  return order
}

const getOrdersByUser = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: 'desc' }
  })
}

const updateStatus = async (orderId, status) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status }
  })
}

const getPurchasedProducts = async (userId) => {
  const orders = await prisma.order.findMany({
    where: { 
      userId, 
      status: 'paid' 
    },
    include: { 
      items: { 
        include: { product: true } 
      } 
    },
    orderBy: { createdAt: 'desc' }
  })
  
  const products = orders.flatMap(order => 
    order.items.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
      purchasedAt: order.createdAt,
      orderId: order.id
    }))
  )
  
  return products
}

module.exports = { createOrder, getOrdersByUser, updateStatus, getPurchasedProducts }