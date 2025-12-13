import { Injectable } from '@nestjs/common';
import { appendFile } from 'fs/promises';

@Injectable()
export class LoggerService {
  private readonly logFile = '../../logs/app.log';

  async log(message: string) {
    const line = `[${new Date().toISOString()}] ${message}\n`;
    await appendFile(this.logFile, line);
  }

  async erro(message: string) {
    const line = `[${new Date().toISOString()}] ERRO: ${message}\n`;
    await appendFile(this.logFile, line);
  }
}
