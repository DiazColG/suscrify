import { IsString, IsNumber, IsDateString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'Name of the subscription' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Price of the subscription' })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ description: 'Currency of the subscription', default: 'USD' })
  @IsOptional()
  @IsString()
  @IsIn(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'ARS', 'MXN'])
  currency?: string = 'USD';

  @ApiPropertyOptional({ description: 'Category of the subscription', default: 'Other' })
  @IsOptional()
  @IsString()
  category?: string = 'Other';

  @ApiProperty({ description: 'Renewal date of the subscription' })
  @IsDateString()
  renewalDate: string;
} 