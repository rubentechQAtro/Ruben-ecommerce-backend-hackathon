const productService = require('../services/productService')

const getAll = async (req, res) => {
  try {
    const filters = req.query
    const result = await productService.getAll(filters)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const create = async (req, res) => {
  try {
    const product = await productService.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const product = await productService.update(req.params.id, req.body)
    res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  try {
    await productService.remove(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

module.exports = { getAll, getById, create, update, remove }

