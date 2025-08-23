import { Module } from '@nestjs/common';
import { PreloadedSubscriptionsService } from './preloaded-subscriptions.service';
import { PreloadedSubscriptionsController } from './preloaded-subscriptions.controller';

@Module({
  controllers: [PreloadedSubscriptionsController],
  providers: [PreloadedSubscriptionsService],
})
export class PreloadedSubscriptionsModule {} 