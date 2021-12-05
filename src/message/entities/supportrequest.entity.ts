import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Schema, Types} from "mongoose";
import { Message } from "./message.entity";

export class SupportRequest extends Document{
    @Prop({unique:true, required:true})
    _id:Types.ObjectId;
    @Prop({unique:false, required:true, type:Schema.Types.ObjectId,  ref:"User"})
    user:Types.ObjectId;
    @Prop({unique:false, required:true})
    createAt:Date;
    @Prop({required:false, unique:false,type:[{type:Schema.Types.ObjectId,ref:"Message"}]})
    messages:Array<Message>
    @Prop({required:false, unique:false,type:Boolean})
    isActive:boolean;
}
export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);