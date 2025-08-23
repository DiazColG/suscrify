#!/bin/bash

echo "🚀 Configurando Suscrify..."

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd backend
npm install

# Configurar base de datos
echo "🗄️ Configurando base de datos..."
npx prisma migrate dev --name init
node seed.js
node seed-exchange-rates.js

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd ../frontend
npm install

echo "✅ ¡Configuración completada!"
echo "📋 Para ejecutar:"
echo "   Backend:  cd backend && npm run start:dev"
echo "   Frontend: cd frontend && npm run dev"
