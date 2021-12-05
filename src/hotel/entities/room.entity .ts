
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document,  Mongoose,  Types } from 'mongoose';
import { Hotel } from './hotel.entity';
@Schema()
export class HotelRoom extends Document{
@Prop({unique:true, required:true})
_id:Types.ObjectId;
@Prop({unique:false, required:true,type:Types.ObjectId,ref:'Hotel'})
hotel:Hotel;
@Prop({required:false, unique:false})
description:string;
@Prop({required:false, unique:false, default:[]})
images:Array<string>
@Prop({required:true, unique:false})
createAt:Date;
@Prop({required:true, unique:false})
updateAt:Date;
@Prop({required:true, unique:false, default:true})
isEnabled:boolean;
}
export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
