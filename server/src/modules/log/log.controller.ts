import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LogService } from './log.service';
import { LogCreateDto } from './dto/LogCreate.dto';
import { type Request } from 'express';
import { getClientIp } from 'request-ip';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getLogs() {
    return await this.logService.getLogs();
  }

  @Post()
  async createLog(@Body() body: LogCreateDto, @Req() req: Request) {
    const { logLevel, message } = body;

    const ip = getClientIp(req);

    this.logService.createLog(ip, logLevel, message);
  }
}
