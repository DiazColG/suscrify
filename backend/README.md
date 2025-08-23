# Suscrify Backend

Backend API para el Micro-SaaS de seguimiento de suscripciones Suscrify.

## 🚀 Tecnologías

- **NestJS** - Framework de Node.js
- **TypeScript** - Lenguaje de programación
- **Prisma ORM** - ORM para base de datos
- **PostgreSQL** - Base de datos (Supabase)
- **JWT** - Autenticación
- **Swagger** - Documentación de API

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Base de datos PostgreSQL (Supabase)

## 🛠️ Instalación

1. **Clonar el repositorio y navegar al directorio backend:**
   ```bash
   cd backend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` en el directorio `backend` con:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/suscrify?schema=public"
   
   # JWT
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   JWT_EXPIRES_IN="7d"
   
   # App
   PORT=3000
   NODE_ENV=development
   ```

4. **Generar cliente de Prisma:**
   ```bash
   npm run prisma:generate
   ```

5. **Ejecutar migraciones de base de datos:**
   ```bash
   npm run prisma:migrate
   ```

## 🏃‍♂️ Ejecución

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

## 📚 API Endpoints

### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión

### Suscripciones
- `GET /subscriptions` - Obtener todas las suscripciones del usuario
- `POST /subscriptions` - Crear nueva suscripción
- `GET /subscriptions/:id` - Obtener suscripción específica
- `PATCH /subscriptions/:id` - Actualizar suscripción
- `DELETE /subscriptions/:id` - Eliminar suscripción

### Dashboard
- `GET /dashboard/summary` - Resumen del dashboard

### Suscripciones Predefinidas
- `GET /preloaded-subscriptions` - Obtener todas las suscripciones predefinidas
- `GET /preloaded-subscriptions/category/:category` - Obtener por categoría
- `GET /preloaded-subscriptions/:id` - Obtener suscripción predefinida específica

## 🔐 Autenticación

La API utiliza JWT para autenticación. Para acceder a endpoints protegidos:

1. Registrarse o iniciar sesión en `/auth/register` o `/auth/login`
2. Usar el token JWT recibido en el header `Authorization: Bearer <token>`

## 📖 Documentación de API

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación de Swagger en:
```
http://localhost:3000/api
```

## 🗄️ Base de Datos

### Modelos

#### User
- `id` - UUID (clave primaria)
- `email` - String único
- `password` - String (hasheado)
- `planStatus` - String (default: "free")
- `createdAt` - DateTime

#### Subscription
- `id` - UUID (clave primaria)
- `name` - String
- `price` - Float
- `currency` - String (default: "USD")
- `category` - String (default: "Other")
- `renewalDate` - DateTime
- `createdAt` - DateTime
- `userId` - String (clave foránea a User)

#### PreloadedSubscription
- `id` - Int (clave primaria, autoincremental)
- `name` - String único
- `category` - String
- `logoUrl` - String opcional

## 🧪 Scripts Disponibles

- `npm run build` - Compilar el proyecto
- `npm run start` - Iniciar en modo producción
- `npm run start:dev` - Iniciar en modo desarrollo con hot reload
- `npm run start:debug` - Iniciar en modo debug
- `npm run test` - Ejecutar tests
- `npm run prisma:generate` - Generar cliente de Prisma
- `npm run prisma:migrate` - Ejecutar migraciones
- `npm run prisma:studio` - Abrir Prisma Studio

## 🔧 Configuración para Supabase

Para usar con Supabase:

1. Crear un proyecto en Supabase
2. Obtener la URL de conexión de la base de datos
3. Actualizar `DATABASE_URL` en el archivo `.env`
4. Ejecutar migraciones: `npm run prisma:migrate`

## 📝 Notas de Desarrollo

- Todos los endpoints de suscripciones requieren autenticación JWT
- Las contraseñas se hashean usando bcrypt
- Los tokens JWT expiran en 7 días por defecto
- La API incluye validación completa con class-validator
- CORS está habilitado para desarrollo

## 🚀 Despliegue

Para desplegar en producción:

1. Configurar variables de entorno de producción
2. Cambiar `JWT_SECRET` por una clave segura
3. Configurar `DATABASE_URL` para la base de datos de producción
4. Ejecutar `npm run build`
5. Usar `npm run start:prod` para iniciar

## 📞 Soporte

Para soporte técnico o preguntas, contactar al equipo de desarrollo. 