import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
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
})
export class AuthModule {}
