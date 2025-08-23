import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PreloadedSubscriptionsModule } from './preloaded-subscriptions/preloaded-subscriptions.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    SubscriptionsModule,
    DashboardModule,
    PreloadedSubscriptionsModule,
    ExchangeRateModule,
  ],
})
export class AppModule {} 