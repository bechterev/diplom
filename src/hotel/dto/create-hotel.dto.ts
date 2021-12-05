
import {IsArray, IsBoolean, IsDate, IsNotEmpty, IsString} from 'class-validator';
import { Schema as MongooseSchema } from '@nestjs/mongoose';
export class CreateHotelDto {
    @IsNotEmpty()
    @IsString()
    _id:string;

    @IsNotEmpty()
    @IsString()
    description:string;
    @IsArray()
    images:Array<string>
    @IsNotEmpty()
    @IsDate()
    createAt:Date;
    @IsNotEmpty()
    @IsDate()
    updateAt:Date;


}