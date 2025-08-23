import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExchangeRateService } from './exchange-rate.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('exchange-rates')
@Controller('exchange-rates')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exchange rates' })
  async getAllRates() {
    return this.exchangeRateService.getAllRates();
  }

  @Get(':fromCurrency/to/:toCurrency')
  @ApiOperation({ summary: 'Get specific exchange rate' })
  async getRate(
    @Param('fromCurrency') fromCurrency: string,
    @Param('toCurrency') toCurrency: string
  ) {
    const rate = await this.exchangeRateService.getRate(fromCurrency, toCurrency);
    return { fromCurrency, toCurrency, rate };
  }

  @Patch(':currency/rate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update exchange rate (Admin only)' })
  async updateRate(
    @Param('currency') currency: string,
    @Body() updateData: { rate: number }
  ) {
    return this.exchangeRateService.updateRate(currency, updateData.rate);
  }
}
