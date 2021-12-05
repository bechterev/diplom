import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { HotelRoomService } from './hotelroom/hotelroom.service';
import { AdminController } from './admin/admin.controller';

@Module({
  controllers: [HotelController, AdminController],
  providers: [HotelService, HotelRoomService]
})
export class HotelModule {}
