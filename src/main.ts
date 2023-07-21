import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from './common/config/config.type';
import { VersioningType } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config(); // .env 파일 로드

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<ConfigType> = app.get(ConfigService);

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  await app.listen(configService.get('PORT'));
}
bootstrap();
