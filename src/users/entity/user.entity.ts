
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document,  Types } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: false})
    _id: Types.ObjectId;

    @Prop({ required: true, unique: false})
    name: string;

    @Prop({ required: true, unique: false})
    passwordHash: string;

    @Prop({ required: false, unique: false})
    contactPhone: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, default:'client', enum:['client', 'admin','manger'] })
    role: string;

    
}

export const UserSchema = SchemaFactory.createForClass(User);