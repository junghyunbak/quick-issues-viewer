import { Module } from '@nestjs/common';
import { OAuthModule } from './modules/oauth/oauth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from './modules/log/log.module';
import * as Joi from 'joi';
import { Log } from './modules/log/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:
        process.env.NODE_ENV === 'dev' ? './sqlite/logs' : '/etc/sqlite/logs',
      entities: [Log],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        GITHUB_APP_OAUTH_CLIENT_ID: Joi.string().required(),
        GITHUB_APP_OAUTH_CLIENT_SECRET: Joi.string().required(),
        GITHUB_APP_ID: Joi.number().required(),
        GITHUB_APP_PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    OAuthModule,
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
