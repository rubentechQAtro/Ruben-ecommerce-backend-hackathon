const prisma = require('../config/db')

const getAll = async () => {
  return await prisma.category.findMany()
}

const getById = async (id) => {
  const category = await prisma.category.findUnique({ where: { id: Number(id) } })
  if (!category) throw new Error('Categoría no encontrada')
  return category
}

const create = async (name) => {
  return await prisma.category.create({ data: { name } })
}

const update = async (id, name) => {
  await getById(id)
  return await prisma.category.update({
    where: { id: Number(id) },
    data: { name }
  })
}

const remove = async (id) => {
  await getById(id)
  await prisma.category.delete({ where: { id: Number(id) } })
}

module.exports = { getAll, getById, create, update, remove }