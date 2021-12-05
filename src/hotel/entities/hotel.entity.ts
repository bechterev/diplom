
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document,  Types } from 'mongoose';
@Schema()
export class Hotel extends Document{
@Prop({unique:true, required:true})
_id:Types.ObjectId;
@Prop({unique:false, required:true})
title:Types.ObjectId;
@Prop({required:false, unique:false})
description:string;
@Prop({required:true, unique:false})
createAt:Date;
@Prop({required:true, unique:false})
updateAt:Date;
}
export const HotelSchema = SchemaFactory.createForClass(Hotel);
