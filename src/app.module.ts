import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HostelsModule } from './hostels/hostels.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from '../config/config.module';
import {ConfigService} from '../config/config.service';
import { ReservationsModule } from './reservations/reservations.module';
import { ChatSupportModule } from './chat-support/chat-support.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory: async (configService:ConfigService)=>configService.getMongoConfig(),
    }), 
    UsersModule, HostelsModule, ReservationsModule, ChatSupportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
