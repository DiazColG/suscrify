import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaModule } from '../common/prisma/prisma.module';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';

@Module({
  imports: [PrismaModule, ExchangeRateModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {} 