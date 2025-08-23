import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(createSubscriptionDto: CreateSubscriptionDto, userId: string) {
    return this.prisma.subscription.create({
      data: {
        ...createSubscriptionDto,
        renewalDate: new Date(createSubscriptionDto.renewalDate),
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (subscription.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return subscription;
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto, userId: string) {
    await this.findOne(id, userId);

    const updateData: any = { ...updateSubscriptionDto };
    if (updateSubscriptionDto.renewalDate) {
      updateData.renewalDate = new Date(updateSubscriptionDto.renewalDate);
    }

    return this.prisma.subscription.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.subscription.delete({
      where: { id },
    });
  }
} 