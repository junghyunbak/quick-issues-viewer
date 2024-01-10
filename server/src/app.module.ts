import { Module } from '@nestjs/common';
import { OAuthModule } from './modules/oauth/oauth.module';
import { LogModule } from './modules/log/log.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
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
