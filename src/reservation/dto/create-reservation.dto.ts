import { ID } from "src/types";
import {IsArray, IsBoolean, IsDate, IsNotEmpty, IsString} from 'class-validator';


interface ReservationDto {
    user: ID;
    hotel: ID;
    room: ID;
    startDate: Date;
    endDate: Date;
  }
  

export class CreateReservationDto implements ReservationDto {
    @IsNotEmpty()
    user: ID;
    @IsNotEmpty()
    hotel: ID;
    @IsNotEmpty()
    room: ID;
    @IsNotEmpty()
    startDate: Date;
    @IsNotEmpty()
    endDate: Date;
}
