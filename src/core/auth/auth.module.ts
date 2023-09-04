import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES') },
      }),
      inject: [ConfigService],
    }),

    UsersModule
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, 
    UsersService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
  ]
})
export class AuthModule { }
