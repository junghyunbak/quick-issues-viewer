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
    const logs = await this.logRepository.find({
      order: { createdAt: 'desc' },
      take: 100,
    });

    return logs.map((log) => {
      const [octet1, octet2, octet3] = log.ip.split('.');

      return {
        ...log,
        ip: [octet1, octet2, octet3, 'xxx'].join('.'),
      };
    });
  }
}
