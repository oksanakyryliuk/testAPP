import { Module } from '@nestjs/common';
import {ConfigService, ConfigModule} from '@nestjs/config';
import appConfig from './common/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {load: [appConfig],
      envFilePath: [".env",".development.env", " prod"],
      isGlobal: true
    }),


  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
