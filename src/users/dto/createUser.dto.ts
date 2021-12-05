import {IsNotEmpty, IsString} from 'class-validator';
import { Schema as MongooseSchema } from '@nestjs/mongoose';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    _id:string
    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    passwordHash:string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    contactPhone: string;

    @IsString()
    @IsNotEmpty()
    role:string = 'client';

}