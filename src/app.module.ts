import { Module } from '@nestjs/common';
import {ConfigService, ConfigModule} from '@nestjs/config';
import appConfig from './common/config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './core/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { TestsModule } from './core/tests/tests.module';
import { QuestionsModule } from './core/questions/questions.module';
import { TestResultsModule } from './core/test-results/test-results.module';

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
    UsersModule,
    AuthModule,
    TestsModule,
    QuestionsModule,
    TestResultsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
