import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './common/config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}