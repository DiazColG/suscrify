import { Injectable } from '@nestjs/common';
import { CsvService } from '../common/csv/csv.service';

@Injectable()
export class PreloadedSubscriptionsService {
  constructor(private csvService: CsvService) {}

  async findAll() {
    const data = await this.csvService.readCsv('preloaded_subscriptions');
    return data.sort((a, b) => (a.name as string).localeCompare(b.name as string));
  }

  async findByCategory(category: string) {
    const data = await this.csvService.findByField('preloaded_subscriptions', 'category', category);
    return data.sort((a, b) => (a.name as string).localeCompare(b.name as string));
  }

  async findOne(id: number) {
    return this.csvService.findById('preloaded_subscriptions', id);
  }
} 