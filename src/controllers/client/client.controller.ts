import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { HotelRoomService } from 'src/hotel/hotelroom/hotelroom.service';
import { ReservationService } from '../../reservation/reservation.service';
import { UserService } from '../../users/user/user.service';
import { SupportRequestClientService } from '../../supportrequest/services/supportRequestClientService';
import { MessageService } from '../../message/message/message.service';

@Controller('/api/client')
export class ClientController {
  constructor(
    private readonly hotelRoomService: HotelRoomService,
    private readonly reservationService: ReservationService,
    private readonly userService: UserService,
    private readonly supportClientService: SupportRequestClientService,
    private readonly messageService: MessageService,
  ) {}

  @Post('/reservations')
  async addReservation(
    @Param() hotelRoom: string,
    @Param() startDate: string,
    @Param() endDate: string,
  ) {
    const room = await this.hotelRoomService.findById(hotelRoom);
    try {
      const reservation = await this.reservationService.addReservation({
        user: '', // user where is
        hotel: room.hotel,
        room: room.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
      return reservation;
    } catch (err) {
      return err;
    }
  }

  @Get('/reservations/')
  async listReservations() {
    return await this.reservationService.getReservations({
      user: 'sadasd32213',
      startDate: undefined,
      endDate: undefined,
    });
  }

  @Delete('/reservations/:id')
  async deleteReservation(@Param() id: string) {
    await this.deleteReservation(id);
  }

  @Post('/register')
  async registration(
    @Body() email: string,
    @Body() password: string,
    @Body() name: string,
    @Body() contactPhone: string,
  ) {
    const newUser = await this.userService.create({
      email,
      passwordHash: password,
      name,
      contactPhone,
    });
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }

  @Post('/support-requests')
  async createSupportRequest(@Body() text: string) {
    const newRequest = await this.supportClientService.createSupportRequest({
      user: '', // fake user
      text,
    });
    return newRequest;
  }

  @Get('/support-request')
  async getListRequest(
    @Query() limit: string,
    @Query() offset: string,
    @Query() isActive: string,
  ) {
    const listRequest = await this.messageService.getAllMessages(
      { offset: Number(offset), limit: Number(limit) },
      Boolean(isActive),
      'dsdasd',
    );
    return listRequest;
  }
}
