import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './common/config/config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyConfigType } from './common/config/config.type';
import { typeOrmConfig } from './common/config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService<ConfigType>) => ({
    //     type: 'mysql',
    //     host: configService.get('DB_HOST') || 'localhost',
    //     port: configService.get("DB_PORT"),
    //     username: configService.get('DB_USER'),
    //     password: configService.get('DB_PASS'),
    //     database: configService.get('DB_NAME'),
    //     entities: [__dirname + '/../**/*.entity.{js,ts}'],
    //     synchronize: false,
    //     migrations: [],
    //     subscribers: [],
    //   }),
    // }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}