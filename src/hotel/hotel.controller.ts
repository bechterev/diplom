import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelRoomService } from './hotelroom/hotelroom.service';

@Controller('api/common/hotel/')
export class HotelController {
  constructor(private readonly hotelService: HotelService, 
    private readonly hotelRoomService: HotelRoomService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  findAll(@Param() params) {
    return this.hotelRoomService.search(params);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelRoomService.update(id, updateHotelDto);
  }
}
