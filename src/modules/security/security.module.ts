import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecurityService } from './services/security.service';

@Module({
  imports: [ConfigModule],
  exports: [SecurityService],
  providers: [SecurityService],
})
export class SecurityModule {}
