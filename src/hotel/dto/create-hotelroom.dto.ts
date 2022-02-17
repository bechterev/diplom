import {IsArray, IsBoolean, IsDate, IsNotEmpty, IsString} from 'class-validator';
import { ID } from 'src/types';
export class CreateHotelRoomDto {
    id: string;

    @IsNotEmpty()
    hotel:string;

    @IsNotEmpty()
    @IsString()
    title:string;

    @IsString()
    description:string;

    @IsArray()
    images:Array<string>;

    @IsDate()
    @IsNotEmpty()
    createAt: Date;

    @IsNotEmpty()
    @IsDate()
    updateAt: Date;

    @IsBoolean()
    isEnabled:boolean;
}