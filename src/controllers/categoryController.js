const categoryService = require('../services/categoryService')

const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAll()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const category = await categoryService.getById(req.params.id)
    res.json(category)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const create = async (req, res) => {
  try {
    const category = await categoryService.create(req.body.name)
    res.status(201).json(category)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const category = await categoryService.update(req.params.id, req.body.name)
    res.json(category)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  try {
    await categoryService.remove(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

module.exports = { getAll, getById, create, update, remove }