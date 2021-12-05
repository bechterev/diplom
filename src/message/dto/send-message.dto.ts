import { ID } from "src/types";
import {IsNotEmpty, IsString} from "class-validator";

interface ISendMessageDto {
    author: ID;
    supportRequest: ID;
    text: string;
  }
export class SendMessageDto implements ISendMessageDto {
    @IsNotEmpty()
    author: ID;
    @IsNotEmpty()
    supportRequest: ID;
    @IsNotEmpty()
    @IsString()
    text: string;
}
