import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('/api/')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('client/reservations')
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.addReservation(createReservationDto)
    .then(x=>x)
    .catch(err=>{throw new HttpException('номер с указанным ID не существует или отключен', HttpStatus.BAD_REQUEST)})
  }

  @Get('/client/reservations')
  findAll() {
    return this.reservationService.getReservations({startDate:new Date,endDate:new Date,user:''})
  }

  @Delete('/client/reservations/:id')
  remove(@Param('id') id: string) {
    return this.reservationService.removeReservation(id)
    .then(x=>x)
    .catch(err=>err=>{throw new HttpException('бронь с указанным ID не существует', HttpStatus.BAD_REQUEST)})
  }
  @Get('/manage/reservations/:userId')
  findThisUser(@Param('userId') userId: string){
    return this.reservationService.getReservations({user:userId,startDate:new Date(),endDate:new Date()})
  }
  @Delete('/manage/reservations/:userId/:reservationId')
  removeforManage(@Param() params: string,) {
    return this.reservationService.removeReservation(params['reservationId'])
    .then(x=>x)
    .catch(err=>err=>{throw new HttpException('бронь с указанным ID не существует', HttpStatus.BAD_REQUEST)})
  }
}
