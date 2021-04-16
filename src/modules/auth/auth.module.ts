import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as redisStore from 'cache-manager-redis-store';
import { AdminModule } from '../admin/admin.module';
import { CoachModule } from '../coach/coach.module';
import { PlayerModule } from '../player/player.module';
import { RefereeModule } from '../referee/referee.module';
import { UserModule } from '../user';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    AdminModule,
    PlayerModule,
    CoachModule,
    RefereeModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (_configService: ConfigService) => ({
        secret: _configService.get<string>('JWT_SECRET_ACCESS_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => ({
        store: redisStore,
        host: _configService.get('REDIS_HOST'),
        port: _configService.get('REDIS_PORT'),
        password: _configService.get('REDIS_PASSWORD'),
        ttl: _configService.get<number>('TTL'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, TokenService],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
