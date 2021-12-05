import {Document, Types} from "mongoose";
import { SchemaFactory, Prop } from "@nestjs/mongoose";
export class Message extends Document{
    @Prop({unique:true, require:true})
    _id:Types.ObjectId;
    @Prop({unique:false, required:true})
    author:Types.ObjectId;
    @Prop({unique:false, required:true})
    sentAt:Date;
    @Prop({unique:false, required:true})
    text:string;
    @Prop({unique:false, required:false})
    readAt:Date;
}
export const MessageSchema = SchemaFactory.createForClass(Message);