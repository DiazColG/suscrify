import { Injectable } from '@nestjs/common';
import { CsvService } from '../common/csv/csv.service';

@Injectable()
export class ExchangeRateService {
  constructor(private csvService: CsvService) {}

  async getAllRates() {
    const rates = await this.csvService.readCsv('exchange_rates');
    return rates.sort((a, b) => (a.fromCurrency as string).localeCompare(b.fromCurrency as string));
  }

  async getRate(fromCurrency: string, toCurrency: string = 'USD'): Promise<number> {
    if (fromCurrency === toCurrency) {
      return 1.0;
    }

    const rates = await this.csvService.findByField('exchange_rates', 'fromCurrency', fromCurrency);
    const rate = rates[0];

    if (!rate) {
      throw new Error(`Exchange rate not found for ${fromCurrency} to ${toCurrency}`);
    }

    return Number(rate.rate);
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
    return this.csvService.update('exchange_rates', fromCurrency, {
      rate: newRate,
      lastUpdated: new Date().toISOString()
    });
  }
}
