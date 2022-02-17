import {IsArray, IsDate, IsNotEmpty, IsString} from 'class-validator';
import { Schema as MongooseSchema } from '@nestjs/mongoose';
export class CreateHotelDto {
    id:string;

    @IsString()
    @IsNotEmpty()
    title:string;

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