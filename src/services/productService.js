///esta la capa que habla directamente con la base de datos prisma si mas adelante quiero cambiar de bd no tengo que modificar los controladores

 const prisma = require('../config/db')

const getAll = async (filters) => {
  const page = parseInt(filters.page) || 1
  const limit = Math.min(parseInt(filters.limit) || 10, 20)
  const skip = (page - 1) * limit

  const where = {}

  if (filters.search) {
    where.name = { contains: filters.search, mode: 'insensitive' }
  }

  if (filters.minPrice || filters.maxPrice) {
    where.price = {}
    if (filters.minPrice) where.price.gte = parseFloat(filters.minPrice)
    if (filters.maxPrice) where.price.lte = parseFloat(filters.maxPrice)
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, skip, take: limit, orderBy: { id: 'asc' } }),
    prisma.product.count({ where })
  ])

  return {
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}

const getById = async (id) => {
  const product = await prisma.product.findUnique({ where: { id: Number(id) } })
  if (!product) throw new Error('Producto no encontrado')
  return product
}

const create = async (data) => {
  return await prisma.product.create({ data })
}

const update = async (id, data) => {
  await getById(id)
  return await prisma.product.update({
    where: { id: Number(id) },
    data
  })
}

const remove = async (id) => {
  await getById(id)
  await prisma.product.delete({ where: { id: Number(id) } })
}

module.exports = { getAll, getById, create, update, remove }