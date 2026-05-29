const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ message: 'Servidor funcionando' })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/payment', paymentRoutes)

module.exports = app