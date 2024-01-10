import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './schemas/log.schema';
import { Model } from 'mongoose';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async createLog(ip: string, logLevel: string, message: string) {
    const log = new this.logModel({ ip, logLevel, message });

    return log.save();
  }

  async getLogs() {
    return this.logModel.find().sort({ createdAt: -1 }).limit(100).exec();
  }
}
