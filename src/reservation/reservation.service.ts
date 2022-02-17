import { Inject, Injectable } from '@nestjs/common';
import { ID } from 'src/types';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationSchema } from './entities/reservation.entity';
import mongoose, { Model } from 'mongoose';

interface ReservationSearchOptions {
  user: ID;
  startDate: Date;
  endDate: Date;
}
interface IReservation {
  addReservation(data: CreateReservationDto): Promise<Reservation>;
  removeReservation(id: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions
  ): Promise<Array<Reservation>>;
}

@Injectable()
export class ReservationService implements IReservation {
  constructor(@Inject(ReservationSchema) private reservationModel : Model<Reservation> ){}

  async addReservation(data: CreateReservationDto): Promise<Reservation> {
    let reserv = await this.reservationModel.findOne({dateStart:{$gte:data.startDate},dateEnd:{$lte:data.endDate}});

    if(!reserv) return await this.reservationModel.create(data);
    else throw Error('the room is occupied');
  }

  async removeReservation(id: ID): Promise<void> {
    await this.reservationModel.remove(id); 
  }

  async getReservations(filter: ReservationSearchOptions): Promise<any[]> {
    const searchFilter : { [key: string]: any } = {};

    if (filter.user) searchFilter.user = filter.user;

    if (filter.startDate) searchFilter.startDate = filter.startDate;

    if (filter.endDate) searchFilter.endDate = filter.endDate;


    return await this.reservationModel.find(searchFilter);
  }

  async deleteReservation(userId: string, reservationId: string) {
    return await this.reservationModel.deleteOne({ userId, reservationId })
  }
}
