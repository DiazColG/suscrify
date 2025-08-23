@echo off
echo 🚀 Configurando Suscrify...

REM Instalar dependencias del backend
echo 📦 Instalando dependencias del backend...
cd backend
call npm install

REM Configurar base de datos
echo 🗄️ Configurando base de datos...
call npx prisma migrate dev --name init
call node seed.js
call node seed-exchange-rates.js

REM Instalar dependencias del frontend
echo 📦 Instalando dependencias del frontend...
cd ..\frontend
call npm install

echo ✅ ¡Configuración completada!
echo 📋 Para ejecutar:
echo    Backend:  cd backend ^&^& npm run start:dev
echo    Frontend: cd frontend ^&^& npm run dev
pause
