import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { UsersRegisterController } from './controllers/user.register.controller';

@Module({
  imports: [UserModule],
  controllers: [UsersRegisterController],
})
export class RegisterModule {}
