import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from '@notification/notification.module';
import { RegisterModule } from '../register/register.module';

@Module({
  imports: [
    AuthModule,
    RegisterModule,
    NotificationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (_configService: ConfigService) => ({
        type: 'postgres',
        host: _configService.get('DB_HOST'),
        port: _configService.get<number>('DB_PORT'),
        username: _configService.get('DB_USERNAME'),
        password: _configService.get('DB_PASSWORD'),
        database: _configService.get('DB_NAME'),
        entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        migrationsRun: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
