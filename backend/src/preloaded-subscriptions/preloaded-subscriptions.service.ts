import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class PreloadedSubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.preloadedSubscription.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findByCategory(category: string) {
    return this.prisma.preloadedSubscription.findMany({
      where: { category },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.preloadedSubscription.findUnique({
      where: { id },
    });
  }
} 