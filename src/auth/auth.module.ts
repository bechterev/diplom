import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from '../controllers/auth/auth.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { LocalStrategy } from './authentication/local.strategy';

@Module({
  imports:[UsersModule, PassportModule, ],
  providers: [AuthenticationService, LocalStrategy],
  controllers:[AuthController],
  exports: [AuthenticationService]
})
export class AuthModule {}
