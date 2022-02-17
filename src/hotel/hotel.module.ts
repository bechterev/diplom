import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './hotelroom/hotelroom.service';

@Module({
  providers: [HotelService, HotelRoomService],
  exports: [HotelService, HotelRoomService]
})
export class HotelModule {}
