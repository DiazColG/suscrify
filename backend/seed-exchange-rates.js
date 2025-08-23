const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedExchangeRates() {
  try {
    console.log('💱 Poblando tasas de cambio...');
    
    // Tasas de cambio actuales (aproximadas al 23 de agosto 2025)
    const exchangeRates = [
      { fromCurrency: 'USD', rate: 1.0 },        // Moneda base
      { fromCurrency: 'ARS', rate: 0.001 },      // 1 ARS = 0.001 USD (1 USD = 1000 ARS)
      { fromCurrency: 'EUR', rate: 1.18 },       // 1 EUR = 1.18 USD
      { fromCurrency: 'GBP', rate: 1.33 },       // 1 GBP = 1.33 USD
      { fromCurrency: 'CAD', rate: 0.75 },       // 1 CAD = 0.75 USD
      { fromCurrency: 'AUD', rate: 0.68 },       // 1 AUD = 0.68 USD
      { fromCurrency: 'MXN', rate: 0.055 },      // 1 MXN = 0.055 USD (1 USD = 18 MXN)
    ];

    // Eliminar tasas existentes
    await prisma.exchangeRate.deleteMany();

    // Insertar nuevas tasas
    for (const rate of exchangeRates) {
      await prisma.exchangeRate.create({
        data: {
          fromCurrency: rate.fromCurrency,
          toCurrency: 'USD',
          rate: rate.rate,
          lastUpdated: new Date()
        }
      });
      console.log(`✅ ${rate.fromCurrency} -> USD: ${rate.rate}`);
    }

    console.log('🎉 Tasas de cambio pobladas exitosamente!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedExchangeRates();
