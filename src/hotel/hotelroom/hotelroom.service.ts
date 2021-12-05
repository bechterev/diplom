import { Inject, Injectable } from '@nestjs/common';
import {HotelRoom, HotelRoomSchema} from '../entities/room.entity ';
import {ID} from '../../types';
import {Model} from "mongoose";

interface SearchRoomsParams {
    limit: number;
    offset: number;
    title: string;
    isEnabled?: true;
  }
  
  interface IHotelRoomService {
    create(data: Partial<HotelRoom>): Promise<HotelRoom>;
    findById(id: ID, isEnabled?: true): Promise<HotelRoom>;
    search(params: SearchRoomsParams): Promise<HotelRoom[]>;
    update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
  }

@Injectable()
export class HotelRoomService implements IHotelRoomService{
    constructor(@Inject(HotelRoomSchema) private hotelRoomModel:Model<HotelRoom>){

    }
    async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
        return this.hotelRoomModel.create(data);
    }
    async findById(id: ID, isEnabled?: true): Promise<HotelRoom> {
        if(isEnabled) return this.hotelRoomModel.findOne({id:id,isEnabled:true})
        else return this.hotelRoomModel.findById(id);
        
    }
    async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
        if(params.isEnabled) return this.hotelRoomModel.find({isEnabled:true,
            [params.limit]:params.limit,
            [params.offset]:params.offset,
            [params.title]:params.title})
        else return this.hotelRoomModel.find({
            [params.limit]:params.limit,
            [params.offset]:params.offset,
            [params.title]:params.title})
    }
    async update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
        return this.update(id,data);
    }
}
