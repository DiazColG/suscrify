import { Module, Global } from '@nestjs/common';
import { CsvService } from './csv.service';

@Global()
@Module({
  providers: [CsvService],
  exports: [CsvService],
})
export class CsvModule {}
