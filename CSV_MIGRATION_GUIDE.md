# 📊 Guía Completa: Migración de Base de Datos a CSVs

## 🎯 Objetivo
Reemplazar SQLite/Prisma por un sistema de archivos CSV que puedas editar directamente desde Excel/Google Sheets.

## 📁 Estructura de Archivos CSV

### 1. **users.csv** - Usuarios del sistema
```csv
id,email,password,planStatus,createdAt
1,admin@suscrify.com,$2b$10$lwjQF6E8w/OEWXxIYSH9MuuxZa2y4TbjocYMp9H15wIbWT/u1BS2G,premium,2024-08-27T00:00:00Z
2,demo@example.com,$2b$10$f3jQC6tM3Lv0pmUlSPOGVuPWB3WX4KYWhAb9J4vDVMsiUYBIN63MG,free,2024-08-27T01:00:00Z
```

**Campos:**
- `id`: Número único (autoincremental)
- `email`: Email único del usuario
- `password`: Hash bcrypt de la contraseña
- `planStatus`: "free" o "premium"
- `createdAt`: Fecha ISO (YYYY-MM-DDTHH:mm:ssZ)

**Contraseñas de ejemplo:**
- admin@suscrify.com: `admin123`
- demo@example.com: `demo123`

### 2. **subscriptions.csv** - Suscripciones de usuarios
```csv
id,name,price,currency,category,renewalDate,createdAt,userId
1,Netflix,15.99,USD,Streaming,2024-09-27T00:00:00Z,2024-08-27T00:00:00Z,1
2,Spotify,9.99,USD,Music,2024-09-15T00:00:00Z,2024-08-27T00:00:00Z,1
```

**Campos:**
- `id`: Número único
- `name`: Nombre del servicio
- `price`: Precio (número decimal)
- `currency`: USD, ARS, EUR, GBP, CAD, AUD, MXN
- `category`: Streaming, Music, Design, Productivity, etc.
- `renewalDate`: Próxima fecha de renovación
- `createdAt`: Fecha de creación
- `userId`: ID del usuario propietario

### 3. **preloaded_subscriptions.csv** - Servicios populares
```csv
id,name,category,logoUrl
1,Netflix,Streaming,https://logo.clearbit.com/netflix.com
2,Spotify,Music,https://logo.clearbit.com/spotify.com
3,Amazon Prime Video,Streaming,https://logo.clearbit.com/amazon.com
```

**Campos:**
- `id`: Número único
- `name`: Nombre del servicio
- `category`: Categoría del servicio
- `logoUrl`: URL del logo (opcional)

### 4. **exchange_rates.csv** - Tipos de cambio
```csv
id,fromCurrency,toCurrency,rate,lastUpdated
1,ARS,USD,0.001,2024-08-27T00:00:00Z
2,EUR,USD,1.10,2024-08-27T00:00:00Z
3,GBP,USD,1.27,2024-08-27T00:00:00Z
```

**Campos:**
- `id`: Número único
- `fromCurrency`: Moneda origen (ARS, EUR, etc.)
- `toCurrency`: Siempre "USD" (moneda base)
- `rate`: Cuántos USD vale 1 unidad de fromCurrency
- `lastUpdated`: Última actualización

## 🔧 Pasos de Implementación

### Paso 1: Migrar datos existentes (opcional)
Si ya tienes datos en SQLite:

```bash
cd backend
npm run migrate:csv
```

Esto exportará todos los datos de Prisma a CSVs.

### Paso 2: Actualizar código del backend
✅ **Ya completado**: Todos los servicios actualizados para usar `CsvService`

### Paso 3: Configurar archivos CSV
Los archivos CSV están en la carpeta `data/`:
- ✅ `data/users.csv`
- ✅ `data/subscriptions.csv`
- ✅ `data/preloaded_subscriptions.csv`
- ✅ `data/exchange_rates.csv`

### Paso 4: Editar datos con Excel/Google Sheets

#### 📝 Editando en Excel:
1. Abrir archivo CSV con Excel
2. Modificar datos directamente
3. **IMPORTANTE**: Guardar como CSV (separado por comas)
4. Asegurar codificación UTF-8

#### 📊 Editando en Google Sheets:
1. Subir CSV a Google Drive
2. Abrir con Google Sheets
3. Editar datos
4. Descargar como CSV

### Paso 5: Validar formato de datos

#### ✅ Reglas importantes:
1. **IDs únicos**: No duplicar IDs
2. **Fechas**: Formato ISO (2024-08-27T00:00:00Z)
3. **Emails únicos**: Un email por usuario
4. **Precios**: Números decimales (15.99)
5. **Contraseñas**: Hashes bcrypt (usar script)

#### 🚫 Errores comunes:
- Comas en valores de texto (usar comillas)
- Fechas en formato incorrecto
- IDs duplicados
- Monedas no soportadas

## 🛠️ Scripts Útiles

### Generar hash de contraseña:
```bash
cd backend
npm run hash:passwords
```

### Migrar desde Prisma:
```bash
cd backend
npm run migrate:csv
```

### Testear aplicación:
```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd frontend
npm run dev
```

## 📊 Ventajas del Sistema CSV

### ✅ Beneficios:
1. **Fácil edición**: Excel, Google Sheets, cualquier editor
2. **Versionado**: Git trackea cambios línea por línea
3. **Portabilidad**: Funciona en cualquier sistema
4. **Backup sencillo**: Copiar archivos CSV
5. **Sin dependencias**: No necesita base de datos
6. **Deployment simple**: Solo archivos de texto

### ⚠️ Consideraciones:
1. **Concurrencia**: Una escritura a la vez
2. **Escalabilidad**: Máximo ~10,000 registros por CSV
3. **Validación**: Manual (no automática)
4. **Relaciones**: Manejo manual con IDs

## 🎨 Personalización de Datos

### Agregar usuarios:
```csv
3,nuevo@email.com,$2b$10$hash_generado_aqui,free,2024-08-27T12:00:00Z
```

### Agregar suscripciones:
```csv
5,GitHub Pro,4.00,USD,Development,2024-10-01T00:00:00Z,2024-08-27T12:00:00Z,1
```

### Actualizar tipos de cambio:
```csv
7,BRL,USD,0.20,2024-08-27T12:00:00Z
```

### Agregar servicios populares:
```csv
16,ChatGPT Plus,Productivity,https://logo.clearbit.com/openai.com
```

## 🚀 Deploy en Vercel

### Variables de entorno necesarias:
```bash
# No necesitas DATABASE_URL para CSVs
JWT_SECRET=tu-jwt-secret-aqui
NEXTAUTH_SECRET=tu-nextauth-secret-aqui
NEXTAUTH_URL=https://tu-app.vercel.app
```

### Archivos incluidos en deploy:
- ✅ Carpeta `data/` con todos los CSVs
- ✅ `CsvService` implementado
- ✅ Todos los servicios actualizados

## 🔍 Testing y Validación

### Verificar datos:
1. Login con usuarios de ejemplo
2. Crear/editar suscripciones
3. Verificar conversión de monedas
4. Revisar dashboard con métricas

### Debug común:
- Verificar formato de fechas
- Comprobar IDs únicos
- Validar estructura CSV
- Revisar permisos de archivos

## 📱 Administración Continua

### Workflow recomendado:
1. **Desarrollo**: Editar CSVs localmente
2. **Testing**: Probar cambios en local
3. **Deploy**: Subir CSVs a Git
4. **Producción**: Vercel actualiza automáticamente

### Backup y recovery:
1. **Git history**: Todos los cambios versionados
2. **Exportar**: Descargar CSVs desde producción
3. **Restore**: Revertir commits si es necesario

---

🎉 **¡Sistema CSV listo para usar!** 

Ahora puedes editar tus datos directamente desde Excel o Google Sheets y deploy directamente a Vercel sin necesidad de base de datos externa.
