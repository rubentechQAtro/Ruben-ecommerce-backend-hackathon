const prisma = require('../config/db')

const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }
  })
  
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: { items: { include: { product: true } } }
    })
  }
  
  return cart
}

const addItem = async (userId, productId, quantity = 1) => {
  const cart = await getOrCreateCart(userId)
  
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId }
  })
  
  if (existingItem) {
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    })
  }
  
  return await prisma.cartItem.create({
    data: { cartId: cart.id, productId, quantity }
  })
}

const updateQuantity = async (userId, productId, quantity) => {
  const cart = await getOrCreateCart(userId)
  
  const item = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId }
  })
  
  if (!item) throw new Error('Producto no encontrado en el carrito')
  
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: item.id } })
    return null
  }
  
  return await prisma.cartItem.update({
    where: { id: item.id },
    data: { quantity }
  })
}

const removeItem = async (userId, productId) => {
  const cart = await getOrCreateCart(userId)
  
  const item = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId }
  })
  
  if (!item) throw new Error('Producto no encontrado en el carrito')
  
  await prisma.cartItem.delete({ where: { id: item.id } })
  
  return { message: 'Producto eliminado del carrito' }
}

module.exports = { getOrCreateCart, addItem, updateQuantity, removeItem }