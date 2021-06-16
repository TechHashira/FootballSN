import { AdminModule } from '@admin/admin.module';
import { CoachModule } from '@coach/registration/coach.module';
import { DeviceModule } from '@devices/device.module';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PlayerModule } from '@player/registration/player.module';
import { RefereeModule } from '@referee/registration/referee.module';
import { SeasonModule } from '@season/registration/season.module';
import { TeamModule } from '@team/registration/team.module';
import { TournamentModule } from '@tournament/registration/tournament.module';
import { UserModule } from '@user/registration/user.module';
import * as redisStore from 'cache-manager-redis-store';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './strategies/accessToken.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    AdminModule,
    PlayerModule,
    CoachModule,
    RefereeModule,
    DeviceModule,
    PassportModule,
    TournamentModule,
    SeasonModule,
    TeamModule,
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
  providers: [AuthService, LocalStrategy, TokenService, JwtStrategy],
  exports: [AuthService, TokenService, JwtModule],
})
export class AuthModule {}
