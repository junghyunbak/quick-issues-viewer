import { Injectable } from '@nestjs/common';
import { Log } from './entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogCreateDto } from './dto/LogCreate.dto';

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private logRepository: Repository<Log>) {}

  createLog(ip: string, logData: LogCreateDto) {
    this.logRepository.save({
      ip,
      method: logData.method,
      status: logData.status,
      path: logData.path,
      time: logData.time,
      isLogin: logData.isLogin ? 1 : 0,
      createdAt: Date.now(),
    });
  }

  async getLogs() {
    return await this.logRepository.find({
      order: { createdAt: 'desc' },
      take: 100,
    });
  }
}
