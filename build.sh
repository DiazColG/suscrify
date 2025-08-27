#!/bin/bash

# Vercel build script for both frontend and backend

echo "🔨 Building Suscrify for production..."

# Build backend
echo "📦 Building backend..."
cd backend
npm install
npm run build
npm run prisma:generate

# Build frontend
echo "🎨 Building frontend..."
cd ../frontend
npm install
npm run build

echo "✅ Build completed successfully!"
