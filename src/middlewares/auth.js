const { verificarToken } = require('../utils/jwt')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }
  
  const token = authHeader.split(' ')[1]
  
  try {
    const decoded = verificarToken(token)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol admin' })
  }
  next()
}

module.exports = { authMiddleware, adminMiddleware }