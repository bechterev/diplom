import { Inject, Injectable } from '@nestjs/common';
import { ID } from 'src/types';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationSchema } from './entities/reservation.entity';
import { Model } from 'mongoose';

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
    if(!reserv)
    return await this.reservationModel.create(data);
  }
  async removeReservation(id: ID): Promise<void> {
    await this.reservationModel.remove(id); 
  }
  async getReservations(filter: ReservationSearchOptions): Promise<any[]> {
    return await this.reservationModel.find(filter)
  }
}
