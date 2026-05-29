const prisma = require('../config/db')
const { hashPassword, comparePassword } = require('../utils/bcrypt')
const { generarToken } = require('../utils/jwt')

const register = async (email, password, name) => {
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) throw new Error('El email ya está registrado')
  
  const hashedPassword = await hashPassword(password)
  
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name }
  })
  
  const token = generarToken(user.id, user.email, user.role)
  
  return { user: { id: user.id, email, name, role: user.role }, token }
}

const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Credenciales inválidas')
  
  const isValid = await comparePassword(password, user.password)
  if (!isValid) throw new Error('Credenciales inválidas')
  
  const token = generarToken(user.id, user.email, user.role)
  
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token }
}

module.exports = { register, login }