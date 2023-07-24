import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MyConfigType } from "./config.type";
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService<MyConfigType>;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: configService.get('DB_HOST') || 'localhost',
  port: configService.get("DB_PORT"),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  synchronize: false,
  migrations: [],
  subscribers: [],
};