import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HotelModule } from './hotel/hotel.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from '../config/config.module';
import {ConfigService} from '../config/config.service';
import { ChatSupportModule } from './chat-support/chat-support.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportrequestModule } from './supportrequest/supportrequest.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory: async (configService:ConfigService)=>configService.getMongoConfig(),
    }), 
    UsersModule, HotelModule,  ChatSupportModule, ReservationModule,
    SupportrequestModule, MessageModule, AuthModule,
    MulterModule.register({ dest: './files'})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
