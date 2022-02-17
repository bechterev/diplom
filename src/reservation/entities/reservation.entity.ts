import {Schema,Prop, SchemaFactory} from "@nestjs/mongoose";
import { Date, Document, Types } from "mongoose";
import { User } from "src/users/entity/user.entity";

export class Reservation extends Document {
    @Prop({require:true, unique:true})
    _id:Types.ObjectId;

    @Prop({required:true, unique:false, type:Types.ObjectId, ref:"User"})
    userId:Types.ObjectId;

    @Prop({required:true, unique:false, type:Types.ObjectId, ref:"Hotel"})
    hotelId:Types.ObjectId;

    @Prop({required:true, unique:false, type:Types.ObjectId, ref:"HotelRoom"})
    roomId:Types.ObjectId;

    @Prop({required:true, unique:false, type:Date})
    startDate:Date;

    @Prop({required:true, unique:false, type:Date})
    endDate: Date;
}
export const ReservationSchema = SchemaFactory.createForClass(Reservation);
