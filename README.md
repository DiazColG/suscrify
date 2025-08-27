# 🚀 Suscrify - Subscription Tracker

**Suscrify** es una aplicación full-stack moderna para gestionar y rastrear suscripciones con conversión automática de múltiples monedas.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white)

## ✨ Características

### 🎯 Funcionalidades Principales
- 📊 **Dashboard Interactivo** con estadísticas en tiempo real
- 💳 **Gestión de Suscripciones** completa (CRUD)
- 🔐 **Autenticación JWT** segura
- 💱 **Conversión de Monedas** automática (USD, ARS, EUR, GBP, CAD, AUD, MXN)
- 📱 **Diseño Responsive** optimizado para móviles
- 🎨 **Interfaz Moderna** con Tailwind CSS

### 🛠 Características Técnicas
- 🏗️ **Arquitectura Modular** con NestJS
- 🗄️ **ORM Prisma** con migraciones automáticas
- 📚 **Documentación API** con Swagger
- 🔄 **Hot Reload** en desarrollo
- 🎭 **TypeScript** end-to-end
- 📦 **Servicios Predefinidos** (Netflix, Spotify, etc.)

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### 1. Clonar el Repositorio
\`\`\`bash
git clone https://github.com/tu-usuario/suscrify.git
cd suscrify
\`\`\`

### 2. Configurar Backend
\`\`\`bash
cd backend
npm install

# Configurar base de datos
npx prisma migrate dev
npm run seed  # Poblar datos iniciales

# Iniciar servidor de desarrollo
npm run start:dev
\`\`\`

### 3. Configurar Frontend
\`\`\`bash
cd ../frontend
npm install

# Iniciar aplicación
npm run dev
\`\`\`

### 4. Acceder a la Aplicación
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Documentación**: http://localhost:3001/api

## 📁 Estructura del Proyecto

\`\`\`
suscrify/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/           # Autenticación JWT
│   │   ├── subscriptions/  # CRUD Suscripciones
│   │   ├── dashboard/      # Analytics y resúmenes
│   │   ├── exchange-rate/  # Conversión de monedas
│   │   └── common/         # Servicios compartidos
│   ├── prisma/             # Esquemas y migraciones
│   └── ...
├── frontend/               # App Next.js
│   ├── src/
│   │   ├── app/           # App Router
│   │   ├── components/    # Componentes React
│   │   ├── lib/          # Cliente API y utils
│   │   └── types/        # Tipos TypeScript
│   └── ...
└── README.md
\`\`\`

## 💡 Uso

### 1. Registro/Login
- Crear cuenta con email y contraseña
- Login automático con JWT tokens

### 2. Gestionar Suscripciones
- **Agregar**: Desde servicios populares o personalizado
- **Editar**: Modificar precio, fecha, categoría
- **Eliminar**: Remover suscripciones obsoletas

### 3. Dashboard Analytics
- Ver costos totales mensuales/anuales en USD
- Breakdown por categorías y monedas
- Próximas renovaciones

### 4. Conversión de Monedas
- Todas las sumas se convierten automáticamente a USD
- Tasas configurables desde el backend
- Soporte para 7 monedas principales

## 🔧 Variables de Entorno

### Backend (.env)
\`\`\`env
DATABASE_URL="file:./dev.db"
JWT_SECRET="tu-jwt-secret-aqui"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
\`\`\`

### Frontend (.env.local)
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001
\`\`\`

## 🌟 Servicios Predefinidos

La aplicación incluye 20+ servicios populares:
- **Streaming**: Netflix, Disney+, Spotify, YouTube Premium
- **Productividad**: Microsoft 365, Google Workspace, Adobe CC
- **Desarrollo**: GitHub Pro, Figma, Notion
- **Comunicación**: Slack, Zoom Pro
- Y muchos más...

## 💱 Monedas Soportadas

| Moneda | Código | Tasa (vs USD) |
|--------|--------|---------------|
| Dólar Estadounidense | USD | 1.00 |
| Peso Argentino | ARS | 0.001 |
| Euro | EUR | 1.18 |
| Libra Esterlina | GBP | 1.33 |
| Dólar Canadiense | CAD | 0.75 |
| Dólar Australiano | AUD | 0.68 |
| Peso Mexicano | MXN | 0.055 |

## 🚀 Deployment

### Desarrollo Local
1. Ambos servicios en puertos separados (3000/3001)
2. Base de datos SQLite para simplicidad
3. Hot reload para desarrollo rápido

### Deployment en Vercel (Recomendado)

#### Preparación
1. **Repositorio en GitHub** ✅ (Ya está configurado)
2. **Archivos de configuración** ✅ (vercel.json creado)

#### Paso a Paso

1. **Crear cuenta en Vercel**
   - Ir a [vercel.com](https://vercel.com)
   - Registrarse con GitHub

2. **Importar proyecto**
   - Clic en "New Project"
   - Seleccionar repositorio `suscrify`
   - Vercel detectará automáticamente Next.js

3. **Configurar variables de entorno**
   ```bash
   DATABASE_URL=postgresql://user:password@host:port/database
   JWT_SECRET=tu-jwt-secret-super-seguro-aqui
   NEXTAUTH_SECRET=tu-nextauth-secret-aqui
   NEXTAUTH_URL=https://tu-app.vercel.app
   FRONTEND_URL=https://tu-app.vercel.app
   ```

4. **Configurar base de datos**
   - **Opción 1**: Railway PostgreSQL (Gratis)
     - Crear cuenta en [railway.app](https://railway.app)
     - Crear proyecto PostgreSQL
     - Copiar DATABASE_URL a Vercel
   
   - **Opción 2**: Neon PostgreSQL (Gratis)
     - Crear cuenta en [neon.tech](https://neon.tech)
     - Crear database
     - Copiar connection string

5. **Deploy automático**
   - Vercel buildea automáticamente
   - Frontend en dominio principal
   - Backend en `/api/*` rutas

### Alternativas de Deployment
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku, Docker
- **Base de datos**: PostgreSQL, MySQL

### Post-deployment
1. **Ejecutar migraciones**:
   ```bash
   npx prisma migrate deploy
   ```
2. **Poblar datos iniciales**:
   ```bash
   npx prisma db seed
   ```

## 🤝 Contribución

1. Fork el proyecto
2. Crear branch feature (\`git checkout -b feature/nueva-funcionalidad\`)
3. Commit cambios (\`git commit -am 'Agregar nueva funcionalidad'\`)
4. Push al branch (\`git push origin feature/nueva-funcionalidad\`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver \`LICENSE\` para más detalles.

## 🙏 Reconocimientos

- [NestJS](https://nestjs.com/) - Framework del backend
- [Next.js](https://nextjs.org/) - Framework del frontend  
- [Prisma](https://prisma.io/) - ORM moderno
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Iconos

---

⭐ **¡Si te gusta el proyecto, dale una estrella!** ⭐
