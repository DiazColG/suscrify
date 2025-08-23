import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PreloadedSubscriptionsService } from './preloaded-subscriptions.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('preloaded-subscriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('preloaded-subscriptions')
export class PreloadedSubscriptionsController {
  constructor(private readonly preloadedSubscriptionsService: PreloadedSubscriptionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all preloaded subscriptions' })
  @ApiResponse({ status: 200, description: 'List of preloaded subscriptions' })
  findAll() {
    return this.preloadedSubscriptionsService.findAll();
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get preloaded subscriptions by category' })
  @ApiResponse({ status: 200, description: 'List of preloaded subscriptions by category' })
  findByCategory(@Param('category') category: string) {
    return this.preloadedSubscriptionsService.findByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific preloaded subscription by ID' })
  @ApiResponse({ status: 200, description: 'Preloaded subscription found' })
  @ApiResponse({ status: 404, description: 'Preloaded subscription not found' })
  findOne(@Param('id') id: string) {
    return this.preloadedSubscriptionsService.findOne(+id);
  }
} 