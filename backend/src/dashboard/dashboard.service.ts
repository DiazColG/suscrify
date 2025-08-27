import { Injectable } from '@nestjs/common';
import { CsvService } from '../common/csv/csv.service';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';

@Injectable()
export class DashboardService {
  constructor(
    private csvService: CsvService,
    private exchangeRateService: ExchangeRateService
  ) {}

  async getSummary(userId: string) {
    const subscriptions = await this.csvService.findByField('subscriptions', 'userId', Number(userId));

    const totalSubscriptions = subscriptions.length;
    
    // Convertir todas las suscripciones a USD para cálculos
    let totalMonthlyCostUSD = 0;
    const subscriptionsWithUSD = [];
    
    for (const sub of subscriptions) {
      const priceInUSD = await this.exchangeRateService.convertToUSD(sub.price as number, sub.currency as string);
      totalMonthlyCostUSD += priceInUSD;
      
      subscriptionsWithUSD.push({
        ...sub,
        priceInUSD
      });
    }
    
    const totalYearlyCostUSD = totalMonthlyCostUSD * 12;

    // Group by category (convertido a USD)
    const categoryBreakdown: Record<string, number> = {};
    for (const sub of subscriptionsWithUSD) {
      const category = sub.category as string;
      categoryBreakdown[category] = (categoryBreakdown[category] || 0) + sub.priceInUSD;
    }

    // Get upcoming renewals (next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const upcomingRenewals = subscriptions.filter(sub => {
      const renewalDate = new Date(sub.renewalDate as string);
      return renewalDate <= thirtyDaysFromNow && renewalDate >= new Date();
    });

    // Get currency breakdown (en monedas originales)
    const currencyBreakdown = subscriptions.reduce((acc, sub) => {
      const currency = sub.currency as string;
      const price = Number(sub.price || 0);
      const currentAmount = Number(acc[currency] || 0);
      acc[currency] = currentAmount + price;
      return acc;
    }, {} as Record<string, number>);

    // Currency breakdown convertido a USD
    const currencyBreakdownUSD: Record<string, number> = {};
    for (const sub of subscriptionsWithUSD) {
      const currency = sub.currency as string;
      currencyBreakdownUSD[currency] = (currencyBreakdownUSD[currency] || 0) + sub.priceInUSD;
    }

    return {
      totalSubscriptions,
      totalMonthlyCost: Math.round(totalMonthlyCostUSD * 100) / 100, // En USD
      totalYearlyCost: Math.round(totalYearlyCostUSD * 100) / 100,   // En USD
      categoryBreakdown: Object.fromEntries(
        Object.entries(categoryBreakdown).map(([key, value]) => [key, Math.round(value * 100) / 100])
      ),
      currencyBreakdown, // Monedas originales
      currencyBreakdownUSD: Object.fromEntries(
        Object.entries(currencyBreakdownUSD).map(([key, value]) => [key, Math.round(value * 100) / 100])
      ),
      upcomingRenewals: upcomingRenewals.length,
      subscriptions: subscriptions.map(sub => {
        const subWithUSD = subscriptionsWithUSD.find(s => s.id === sub.id);
        return {
          id: sub.id,
          name: sub.name,
          price: sub.price,
          priceInUSD: Math.round(subWithUSD.priceInUSD * 100) / 100,
          currency: sub.currency,
          category: sub.category,
          renewalDate: sub.renewalDate,
        };
      }),
    };
  }
} 