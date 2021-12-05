import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateHotelRoomDto } from '../dto/create-hotelroom.dto';
import { UpdateHotelRoomDto } from '../dto/update-hotelroom.dto';
import { HotelService } from '../hotel.service';
import { HotelRoomService } from '../hotelroom/hotelroom.service';

@Controller('/api/admin/hotel-rooms/')
export class AdminController {
    constructor(private hotelService: HotelService,
        private hotelRoomService: HotelRoomService){}
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createRoom(@Body() data: CreateHotelRoomDto,@UploadedFile() images: Array<Express.Multer.File>){
        return this.hotelRoomService.create(data);
    }
    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    update(@Param('id') id: string,@Body()data: UpdateHotelRoomDto, @UploadedFile() images: Array<Express.Multer.File>){
       return this.hotelRoomService.update(id,data);
    } 
}
