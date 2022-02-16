import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { HotelService } from 'src/hotel/hotel.service';
import mongoose from 'mongoose';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils';
import { HotelRoomService } from 'src/hotel/hotelroom/hotelroom.service';
import { UserService } from 'src/users/user/user.service';

@Controller('/api/admin')
export class AdminController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly roomService: HotelRoomService,
    private readonly userService: UserService,
  ) {}

  @Post('/hotels')
  async addHotel(@Body() title: string, @Body() description: string) {
    try {
      const hotel = await this.hotelService.create({
        id: new mongoose.Types.ObjectId().toString(),
        title,
        description,
        images: [],
        createAt: new Date(),
        updateAt: undefined,
      });
      return {
        id: hotel.id,
        title: hotel.title,
        description: hotel.description,
      };
    } catch (e) {
      return { error: e };
    }
  }

  @Get('/hotels')
  async getHotels(@Query() limit: number, @Query() offset: number) {
    const hotels = await this.hotelService.getListHotels(limit, offset);

    return hotels.map((el) => {
      return { id: el.id, title: el.title, description: el.description };
    });
  }

  @Put('/hotels/:id')
  async changeDescription(
    @Body() title: string,
    @Body() description: string,
    @Param() id: string,
  ) {
    const changeHotel = await this.hotelService.changeDescription(
      id,
      title,
      description,
    );

    if (changeHotel.status === 'error') {
      return changeHotel.message;
    }

    return { id, title, description };
  }

  @Post('/hotel-rooms')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async addRoom(
    @Body() title: string,
    @Body() description: string,
    @Body() hotelId: string,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const fileNames = [];

    images.forEach((image) => {
      fileNames.push(image.filename);
    });

    const newRoom = await this.roomService.create({
      title,
      description,
      hotel: hotelId,
      images: fileNames,
    });

    return newRoom;
  }

  @Put('/hotel-room/:id')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async changeRoom(
    @Body() title: string,
    @Body() description: string,
    @Body() hotelId: string,
    @UploadedFiles() images: Express.Multer.File[],
    @Param() id: string,
  ) {
    const fileNames = [];

    images.forEach((image) => {
      fileNames.push(image.filename);
    });

    const room = await this.roomService.findWithId(id);
    room.title = title;
    room.description = description;
    room.hotel = hotelId;

    fileNames.map((el) => {
      if (!room.images.some((file) => file === el)) {
        room.images.push(el);
      }
    });

    await room.save();

    const hotel = await this.hotelService.findById(hotelId);

    return {
      id: room.id,
      title: room.title,
      description: room.description,
      images: room.images,
      isEnabled: room.isEnabled,
      hotel: {
        id: hotel.id,
        title: hotel.title,
        description: hotel.description,
      },
    };
  }

  @Post('/users/')
  async createUser(
    @Body() email: string,
    @Body() password: string,
    @Body() name: string,
    @Body() contactPhone: string,
    @Body() role: string,
  ) {
    const newUser = await this.userService.create({
      email,
      passwordHash: password,
      name,
      contactPhone,
      role,
    });

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      contactPhone: newUser.contactPhone,
      role: newUser.role,
    };
  }
  
  @Get('/users/')
  async listUser(
      @Query() limit: number,
      @Query() offset: number,
      @Query() name: string,
      @Query() email: string,
      @Query() contactPhone: string,
  ) {
      const list = await this.userService.findAll(
          { limit, offset, name, email, contactPhone, },
      );
      return list.map((el) => {
          return {
              id: el.id,
              email: el.email,
              name: el.name,
              contactPhone: el.contactPhone,
          }
      })
  }
}
