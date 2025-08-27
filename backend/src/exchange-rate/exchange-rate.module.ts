import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';

@Module({
  imports: [],
  providers: [ExchangeRateService],
  controllers: [ExchangeRateController],
  exports: [ExchangeRateService]
})
export class ExchangeRateModule {}
