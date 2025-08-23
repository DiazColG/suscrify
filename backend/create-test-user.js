const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    console.log('🔧 Creando usuario de prueba...');
    
    // Eliminar usuario existente si existe
    await prisma.user.deleteMany({
      where: { email: 'test@example.com' }
    });
    
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Usuario de Prueba'
      }
    });
    
    console.log('✅ Usuario creado exitosamente:');
    console.log(`  - Email: ${user.email}`);
    console.log(`  - Password: password123`);
    console.log(`  - ID: ${user.id}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
