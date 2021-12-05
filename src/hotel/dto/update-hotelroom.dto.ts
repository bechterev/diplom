import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelRoomDto } from './create-hotelroom.dto';

export class UpdateHotelRoomDto extends PartialType(CreateHotelRoomDto) {}
