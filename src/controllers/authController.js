 const userService = require('../services/userService')

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    const result = await userService.register(email, password, name)
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await userService.login(email, password)
    res.json(result)
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

module.exports = { register, login }