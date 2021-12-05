import { PartialType } from '@nestjs/mapped-types';
import { ID } from 'src/types';
import {IsNotEmpty, IsString}from "class-validator"

interface IMarkMessagesAsReadDto {
    user: ID;
    supportRequest: ID;
    createdBefore: Date;
  }

export class MarkMessagesAsReadDto implements IMarkMessagesAsReadDto{
    @IsString()
    user: ID;
    @IsNotEmpty()
    supportRequest: ID;
    @IsNotEmpty()
    createdBefore: Date;
}
