 # Ecommerce Backend - Hackathon Final

Backend de un ecommerce desarrollado con Node.js, Express, Prisma, PostgreSQL (Neon) y Stripe.

Requisitos previos

- Node.js v18+
- npm
- Cuenta en Neon.tech (PostgreSQL gratis)
- Cuenta en Stripe

Instalacion

git clone https://github.com/TU_USUARIO/ecommerce-backend-hackathon.git
cd ecommerce-backend-hackathon
npm install

Configuracion de entorno

Crea un archivo .env en la raiz del proyecto:

PORT=3000
DATABASE_URL="postgresql://usuario:contraseña@host:5432/neondb?sslmode=require"
JWT_SECRET="tu_clave_super_secreta"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

Nunca subas el archivo .env a GitHub (esta en .gitignore)

Base de datos

npx prisma migrate dev --name init
npx prisma generate
npx prisma studio

Ejecutar el servidor

npm run dev

El servidor corre en http://localhost:3000

Endpoints disponibles

Autenticacion

POST /api/auth/register - Registrar usuario
POST /api/auth/login - Iniciar sesion (devuelve JWT)

Productos (publico)

GET /api/products - Listar todos los productos
GET /api/products/:id - Obtener un producto

Productos (admin - requiere token)

POST /api/products - Crear producto
PUT /api/products/:id - Actualizar producto
DELETE /api/products/:id - Eliminar producto

Carrito (requiere token)

GET /api/cart - Ver carrito
POST /api/cart/items - Agregar producto
PUT /api/cart/items/:productId - Cambiar cantidad
DELETE /api/cart/items/:productId - Eliminar producto

Ordenes (requiere token)

POST /api/orders - Crear orden desde carrito
GET /api/orders - Listar mis ordenes
GET /api/orders/my-products - Ver productos comprados (pagados)

Pagos (requiere token)

POST /api/payments/create-payment-intent - Crear intento de pago
POST /api/payments/confirm-order - Confirmar pago y cambiar orden a paid

Flujo de pago completo

1. Agregar producto al carrito: POST /api/cart/items
2. Crear orden: POST /api/orders
3. Crear payment intent: POST /api/payments/create-payment-intent
4. Confirmar pago: POST /api/payments/confirm-order
5. Ver productos comprados: GET /api/orders/my-products

Probar con Postman

1. Importa la coleccion ecommerce-backend.postman_collection.json
2. Configura variable TOKEN con el token recibido al hacer login
3. Las peticiones protegidas usan Authorization: Bearer TOKEN

Tecnologias utilizadas

- Node.js + Express - Backend
- Prisma ORM - Modelado y consultas a DB
- PostgreSQL (Neon.tech) - Base de datos en la nube
- JWT + bcrypt - Autenticacion y seguridad
- Stripe - Pasarela de pagos
- Docker (opcional) - Contenerizacion
- Render (opcional) - Despliegue

Estructura del proyecto

src/
├── config/         Configuracion (DB)
├── controllers/    Controladores (req/res)
├── middlewares/    Auth, roles
├── routes/         Endpoints
├── services/       Logica de negocio
├── utils/          JWT, bcrypt
├── app.js
└── server.js

prisma/
├── schema.prisma   Modelos de datos
└── migrations/

Roles

- user: Puede ver productos, manejar carrito, crear ordenes y pagar
- admin: Todo lo anterior + crear/editar/eliminar productos

Autor

Ruben Rojas  - GitHub: TU_USUARIO