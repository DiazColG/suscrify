import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CsvService } from '../common/csv/csv.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private csvService: CsvService) {}

  async create(createSubscriptionDto: CreateSubscriptionDto, userId: string) {
    return this.csvService.create('subscriptions', {
      ...createSubscriptionDto,
      renewalDate: new Date(createSubscriptionDto.renewalDate).toISOString(),
      userId: Number(userId),
    });
  }

  async findAll(userId: string) {
    const subscriptions = await this.csvService.findByField('subscriptions', 'userId', Number(userId));
    return subscriptions.sort((a, b) => {
      const dateA = new Date(a.createdAt as string);
      const dateB = new Date(b.createdAt as string);
      return dateB.getTime() - dateA.getTime();
    });
  }

  async findOne(id: string, userId: string) {
    const subscription = await this.csvService.findById('subscriptions', Number(id));

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (Number(subscription.userId) !== Number(userId)) {
      throw new ForbiddenException('Access denied');
    }

    return subscription;
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto, userId: string) {
    await this.findOne(id, userId);

    const updateData: any = { ...updateSubscriptionDto };
    if (updateSubscriptionDto.renewalDate) {
      updateData.renewalDate = new Date(updateSubscriptionDto.renewalDate).toISOString();
    }

    return this.csvService.update('subscriptions', Number(id), updateData);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    const deleted = await this.csvService.delete('subscriptions', Number(id));
    return deleted;
  }
} 