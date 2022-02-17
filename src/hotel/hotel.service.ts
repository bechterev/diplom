import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import {Hotel, HotelSchema} from './entities/hotel.entity';
import {ID} from '../types';
import { Model} from "mongoose";


interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: Pick<Hotel, "title">): Promise<Hotel[]>;
}

@Injectable()
export class HotelService implements IHotelService {
  constructor(@Inject(HotelSchema) private hotelModel:Model<Hotel>){}
  async create(createHotelDto: CreateHotelDto):Promise<Hotel> {
    return this.hotelModel.create(createHotelDto);
  }

  async findById(id: ID):Promise<Hotel> {
    return this.hotelModel.findById(id);
  }

  async  search(params: Pick<Hotel,"title">):Promise<Hotel[]>{
    return this.hotelModel.find(params);
  }

  async getListHotels(limit:number, offset: number = 0): Promise<Hotel[]> {
    try {
      return await this.hotelModel.find().skip(offset).limit(limit);
    } catch (e) {
      return [];
    }
  }

  async changeDescription(id: string, title: string, description: string) {
    try {
      const result = this.hotelModel.updateOne({id}, {title, description, updateAt: new Date()});
      return { status: 'success' };
    } catch (err) { return { status: 'error', message: err.message  }};
  }
}
