import { ObjectId } from 'mongoose';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {
    id: string;
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