const jwt = require('jsonwebtoken')

const generarToken = (userId, email, role) => {
  return jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generarToken, verificarToken }