# Suscrify Frontend

Frontend moderno para la aplicación de gestión de suscripciones Suscrify.

## 🛠️ Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos modernos
- **Axios** - Cliente HTTP para API

## 🚀 Instalación y Configuración

### 1. Instalar dependencias
```bash
cd frontend
npm install
```

### 2. Configurar variables de entorno
Crear archivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3001`

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Layout principal
│   │   ├── globals.css        # Estilos globales
│   │   ├── login/
│   │   │   └── page.tsx       # Página de login
│   │   ├── register/
│   │   │   └── page.tsx       # Página de registro
│   │   └── dashboard/
│   │       └── page.tsx       # Dashboard principal
│   ├── lib/
│   │   └── api.ts             # Cliente API
│   └── types/
│       └── index.ts           # Tipos TypeScript
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🎨 Páginas Incluidas

### 🏠 **Landing Page** (`/`)
- Hero section atractivo
- Features principales
- Call-to-action
- SEO optimizado
- Responsive design

### 🔐 **Autenticación**
- **Login** (`/login`) - Formulario de inicio de sesión
- **Register** (`/register`) - Formulario de registro
- Validación de formularios
- Manejo de errores
- Integración con JWT

### 📊 **Dashboard** (`/dashboard`)
- Resumen de estadísticas
- Lista de suscripciones
- Cards con métricas
- Responsive layout
- Botones de acción

## 🔗 Integración con Backend

El frontend se conecta automáticamente con tu backend NestJS:

```typescript
// Configuración automática
const API_BASE_URL = 'http://localhost:3000'

// Autenticación automática
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## 📱 Características

### ✅ **Responsive Design**
- Mobile-first approach
- Breakpoints: `sm:` `md:` `lg:` `xl:`
- Grid system adaptativo

### ✅ **Autenticación**
- JWT tokens
- Protected routes
- Persistent login
- Logout automático

### ✅ **UI/UX Moderna**
- Componentes Tailwind CSS
- Iconos Lucide React
- Gradientes y sombras
- Animaciones sutiles

### ✅ **TypeScript**
- Tipos compartidos con backend
- Autocompletado completo
- Detección de errores

## 🚀 Scripts Disponibles

```bash
npm run dev        # Desarrollo
npm run build      # Build producción
npm run start      # Iniciar build
npm run lint       # Linting
```

## 🌐 Deployment

### Vercel (Recomendado)
```bash
# Conectar con Vercel
vercel

# Configurar variables de entorno
NEXT_PUBLIC_API_URL=https://tu-backend.herokuapp.com
```

### Otros Proveedores
- Netlify
- Railway
- Digital Ocean

## 🔧 Próximas Mejoras

- [ ] Agregar modal para crear suscripciones
- [ ] Implementar edición inline
- [ ] Gráficos con Recharts
- [ ] Dark mode
- [ ] Filtros y búsqueda
- [ ] Notificaciones push
- [ ] PWA support

## 🎯 Uso

1. **Inicio**: Visita la landing page
2. **Registro**: Crea una cuenta gratuita
3. **Dashboard**: Gestiona tus suscripciones
4. **Agregar**: Añade nuevas suscripciones
5. **Controlar**: Monitorea gastos y renovaciones
