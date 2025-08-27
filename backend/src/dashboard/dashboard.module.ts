import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';

@Module({
  imports: [ExchangeRateModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {} 