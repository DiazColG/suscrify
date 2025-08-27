import * as fs from 'fs';
import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';

export interface CsvRow {
  [key: string]: string | number | boolean;
}

@Injectable()
export class CsvService {
  private readonly logger = new Logger(CsvService.name);
  private readonly dataPath = path.join(process.cwd(), 'data');

  constructor() {
    this.ensureDataDirectory();
  }

  private ensureDataDirectory() {
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
      this.logger.log('Created data directory');
    }
  }

  private getFilePath(tableName: string): string {
    return path.join(this.dataPath, `${tableName}.csv`);
  }

  private parseCsvLine(line: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  private parseValue(value: string, type?: string): any {
    if (value === '' || value === null || value === undefined) {
      return null;
    }

    // Remove quotes if present
    const cleanValue = value.replace(/^"|"$/g, '');

    // Try to parse as number
    if (!isNaN(Number(cleanValue)) && cleanValue !== '') {
      return Number(cleanValue);
    }

    // Try to parse as boolean
    if (cleanValue.toLowerCase() === 'true') return true;
    if (cleanValue.toLowerCase() === 'false') return false;

    // Try to parse as date
    if (cleanValue.includes('T') && cleanValue.includes('Z')) {
      const date = new Date(cleanValue);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    return cleanValue;
  }

  async readCsv(tableName: string): Promise<CsvRow[]> {
    const filePath = this.getFilePath(tableName);
    
    if (!fs.existsSync(filePath)) {
      this.logger.warn(`CSV file not found: ${filePath}`);
      return [];
    }

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      if (lines.length === 0) return [];

      const headers = this.parseCsvLine(lines[0]);
      const data: CsvRow[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = this.parseCsvLine(lines[i]);
        const row: CsvRow = {};
        
        headers.forEach((header, index) => {
          row[header] = this.parseValue(values[index] || '');
        });
        
        data.push(row);
      }

      return data;
    } catch (error) {
      this.logger.error(`Error reading CSV ${tableName}:`, error);
      return [];
    }
  }

  async writeCsv(tableName: string, data: CsvRow[]): Promise<void> {
    if (data.length === 0) return;

    const filePath = this.getFilePath(tableName);
    const headers = Object.keys(data[0]);
    
    try {
      let content = headers.join(',') + '\n';
      
      for (const row of data) {
        const values = headers.map(header => {
          let value = row[header];
          
          if (value === null || value === undefined) {
            return '';
          }
          
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
          
          return value;
        });
        
        content += values.join(',') + '\n';
      }

      fs.writeFileSync(filePath, content);
      this.logger.log(`Updated CSV: ${tableName}`);
    } catch (error) {
      this.logger.error(`Error writing CSV ${tableName}:`, error);
      throw error;
    }
  }

  async findById(tableName: string, id: string | number): Promise<CsvRow | null> {
    const data = await this.readCsv(tableName);
    return data.find(row => row.id === id) || null;
  }

  async findByField(tableName: string, field: string, value: any): Promise<CsvRow[]> {
    const data = await this.readCsv(tableName);
    return data.filter(row => row[field] === value);
  }

  async create(tableName: string, newData: Omit<CsvRow, 'id'>): Promise<CsvRow> {
    const data = await this.readCsv(tableName);
    
    // Generate new ID
    const maxId = data.reduce((max, row) => {
      const id = typeof row.id === 'string' ? parseInt(row.id) : row.id as number;
      return Math.max(max, id || 0);
    }, 0);
    
    const newRow: CsvRow = {
      id: maxId + 1,
      ...newData,
      createdAt: new Date().toISOString(),
    };
    
    data.push(newRow);
    await this.writeCsv(tableName, data);
    
    return newRow;
  }

  async update(tableName: string, id: string | number, updateData: Partial<CsvRow>): Promise<CsvRow | null> {
    const data = await this.readCsv(tableName);
    const index = data.findIndex(row => row.id === id);
    
    if (index === -1) return null;
    
    data[index] = { ...data[index], ...updateData };
    await this.writeCsv(tableName, data);
    
    return data[index];
  }

  async delete(tableName: string, id: string | number): Promise<boolean> {
    const data = await this.readCsv(tableName);
    const filteredData = data.filter(row => row.id !== id);
    
    if (filteredData.length === data.length) return false;
    
    await this.writeCsv(tableName, filteredData);
    return true;
  }

  async count(tableName: string): Promise<number> {
    const data = await this.readCsv(tableName);
    return data.length;
  }
}
