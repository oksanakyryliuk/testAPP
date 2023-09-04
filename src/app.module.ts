import { Module } from '@nestjs/common';
import {ConfigService, ConfigModule} from '@nestjs/config';
import appConfig from './common/config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './core/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {load: [appConfig],
      envFilePath: [".env",".development.env", " prod"],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    UsersModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
