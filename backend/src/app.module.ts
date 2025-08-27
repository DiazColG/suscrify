import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PreloadedSubscriptionsModule } from './preloaded-subscriptions/preloaded-subscriptions.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { CsvModule } from './common/csv/csv.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CsvModule,
    AuthModule,
    SubscriptionsModule,
    DashboardModule,
    PreloadedSubscriptionsModule,
    ExchangeRateModule,
  ],
})
export class AppModule {} 