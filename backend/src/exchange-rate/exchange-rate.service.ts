import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class ExchangeRateService {
  constructor(private prisma: PrismaService) {}

  async getAllRates() {
    return this.prisma.exchangeRate.findMany({
      orderBy: { fromCurrency: 'asc' }
    });
  }

  async getRate(fromCurrency: string, toCurrency: string = 'USD'): Promise<number> {
    if (fromCurrency === toCurrency) {
      return 1.0;
    }

    const rate = await this.prisma.exchangeRate.findUnique({
      where: { fromCurrency }
    });

    if (!rate) {
      throw new Error(`Exchange rate not found for ${fromCurrency} to ${toCurrency}`);
    }

    return rate.rate;
  }

  async convertToUSD(amount: number, fromCurrency: string): Promise<number> {
    if (fromCurrency === 'USD') {
      return amount;
    }

    const rate = await this.getRate(fromCurrency, 'USD');
    return amount * rate;
  }

  async convertFromUSD(amountUSD: number, toCurrency: string): Promise<number> {
    if (toCurrency === 'USD') {
      return amountUSD;
    }

    const rate = await this.getRate(toCurrency, 'USD');
    return amountUSD / rate;
  }

  async convertBetweenCurrencies(
    amount: number, 
    fromCurrency: string, 
    toCurrency: string
  ): Promise<number> {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    // Convertir a USD primero, luego a la moneda destino
    const amountInUSD = await this.convertToUSD(amount, fromCurrency);
    return this.convertFromUSD(amountInUSD, toCurrency);
  }

  async updateRate(fromCurrency: string, newRate: number) {
    return this.prisma.exchangeRate.update({
      where: { fromCurrency },
      data: { 
        rate: newRate,
        lastUpdated: new Date()
      }
    });
  }
}
