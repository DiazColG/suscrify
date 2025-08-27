import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface CsvRow {
  [key: string]: any;
}

function formatCsvValue(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (value instanceof Date) {
    return value.toISOString();
  }
  
  const str = String(value);
  
  // Si contiene comas o comillas, envolvemos en comillas y escapamos
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  
  return str;
}

function arrayToCsv(data: CsvRow[]): string {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const headerRow = headers.join(',');
  
  const dataRows = data.map(row => 
    headers.map(header => formatCsvValue(row[header])).join(',')
  );
  
  return [headerRow, ...dataRows].join('\n');
}

async function migrateToCsv() {
  console.log('🔄 Starting migration from Prisma to CSV...');
  
  const dataDir = path.join(process.cwd(), 'data');
  
  // Crear directorio si no existe
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('📁 Created data directory');
  }

  try {
    // Migrar usuarios
    console.log('👥 Migrating users...');
    const users = await prisma.user.findMany();
    const usersCsv = arrayToCsv(users);
    fs.writeFileSync(path.join(dataDir, 'users.csv'), usersCsv);
    console.log(`✅ Migrated ${users.length} users`);

    // Migrar suscripciones
    console.log('📋 Migrating subscriptions...');
    const subscriptions = await prisma.subscription.findMany();
    const subscriptionsCsv = arrayToCsv(subscriptions);
    fs.writeFileSync(path.join(dataDir, 'subscriptions.csv'), subscriptionsCsv);
    console.log(`✅ Migrated ${subscriptions.length} subscriptions`);

    // Migrar suscripciones precargadas
    console.log('🏪 Migrating preloaded subscriptions...');
    const preloadedSubs = await prisma.preloadedSubscription.findMany();
    const preloadedSubsCsv = arrayToCsv(preloadedSubs);
    fs.writeFileSync(path.join(dataDir, 'preloaded_subscriptions.csv'), preloadedSubsCsv);
    console.log(`✅ Migrated ${preloadedSubs.length} preloaded subscriptions`);

    // Migrar tipos de cambio
    console.log('💱 Migrating exchange rates...');
    const exchangeRates = await prisma.exchangeRate.findMany();
    const exchangeRatesCsv = arrayToCsv(exchangeRates);
    fs.writeFileSync(path.join(dataDir, 'exchange_rates.csv'), exchangeRatesCsv);
    console.log(`✅ Migrated ${exchangeRates.length} exchange rates`);

    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Summary:
    - Users: ${users.length}
    - Subscriptions: ${subscriptions.length}
    - Preloaded Subscriptions: ${preloadedSubs.length}
    - Exchange Rates: ${exchangeRates.length}
    
    📁 CSV files saved in: ${dataDir}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar migración
migrateToCsv();
