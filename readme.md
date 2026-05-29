# E-commerce Backend

Backend de e-commerce desarrollado para hackathon final. Implementa autenticación JWT, CRUD de productos, carrito de compras, órdenes, categorías y pasarela de pagos simulada.

## Tecnologías
- Node.js + Express
- PostgreSQL (Neon.tech) + Prisma ORM
- JWT para autenticación
- Stripe (modo simulado)
- Docker

## Instalación local

1. Clonar repositorio
2. `npm install`
3. Crear archivo `.env`:
DATABASE_URL=postgresql://...
JWT_SECRET=clave_secreta
PORT=3000

text
4. `npx prisma migrate dev`
5. `npm run dev`

## Endpoints principales

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Registrar usuario | No |
| POST | /api/auth/login | Login (devuelve token) | No |
| GET | /api/products | Listar productos (paginado) | No |
| GET | /api/products/:id | Ver producto | No |
| POST | /api/products | Crear producto | Admin |
| PUT | /api/products/:id | Editar producto | Admin |
| DELETE | /api/products/:id | Eliminar producto | Admin |
| GET | /api/cart | Ver carrito | Sí |
| POST | /api/cart/items | Agregar al carrito | Sí |
| PUT | /api/cart/items/:productId | Cambiar cantidad | Sí |
| DELETE | /api/cart/items/:productId | Quitar del carrito | Sí |
| POST | /api/orders | Crear orden | Sí |
| GET | /api/orders | Ver mis órdenes | Sí |
| GET | /api/categories | Listar categorías | No |
| POST | /api/payment/create-payment-intent | Simular pago | Sí |

## Colección Postman

Importar en Postman desde el archivo: miEcommerce.postman_collection.json

## Docker

```bash
docker build -t ecommerce-backend .
docker run -p 3000:3000 --env-file .env ecommerce-backend