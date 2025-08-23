const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Verificando base de datos...');
    
    // Verificar usuarios
    const users = await prisma.user.findMany();
    console.log(`👥 Usuarios encontrados: ${users.length}`);
    
    if (users.length > 0) {
      console.log('📋 Lista de usuarios:');
      users.forEach(user => {
        console.log(`  - ${user.email} (ID: ${user.id})`);
      });
    }
    
    // Verificar suscripciones predefinidas
    const preloadedSubs = await prisma.preloadedSubscription.findMany();
    console.log(`🔧 Suscripciones predefinidas: ${preloadedSubs.length}`);
    
    // Verificar suscripciones de usuarios
    const userSubs = await prisma.subscription.findMany();
    console.log(`📊 Suscripciones de usuarios: ${userSubs.length}`);
    
    // Verificar tipos de cambio
    const exchangeRates = await prisma.exchangeRate.findMany();
    console.log(`💱 Tipos de cambio configurados: ${exchangeRates.length}`);
    
    if (exchangeRates.length > 0) {
      console.log('💰 Tasas de cambio:');
      exchangeRates.forEach(rate => {
        console.log(`  - 1 ${rate.fromCurrency} = ${rate.rate} USD`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
