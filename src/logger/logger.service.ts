import { Injectable } from '@nestjs/common';
import { appendFile, mkdir } from 'fs/promises';
import { dirname } from 'path';

@Injectable()
export class LoggerService {
  private readonly logFile = 'logs/app.log';

  async onModuleInit() {
    await this.garantirPasta();
  }

  private async garantirPasta() {
    const pasta = dirname(this.logFile);
    await mkdir(pasta, { recursive: true });
  }

  async log(message: string) {
    const line = `[${new Date().toISOString()}] ${message}\n`;
    await appendFile(this.logFile, line);
  }

  async erro(message: string) {
    const line = `[${new Date().toISOString()}] ERRO: ${message}\n`;
    await appendFile(this.logFile, line);
  }
}
