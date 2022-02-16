import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { HotelRoomService } from 'src/hotel/hotelroom/hotelroom.service';
import { SupportRequestService } from '../supportrequest/services/supportRequestService';
import { UserService } from 'src/users/user/user.service';
import { SupportRequestEmployeeService } from 'src/supportrequest/services/supportRequestEmployeeService';
import { SupportRequestClientService } from 'src/supportrequest/services/supportRequestClientService';

@Controller('/api/common')
export class CommonController {
  constructor(
    private readonly hotelRoomService: HotelRoomService,
    private readonly supportService: SupportRequestService,
    private readonly userService: UserService,
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
    private readonly supportRequestClientService: SupportRequestClientService,
  ) {}

  @Get('/hotel-room')
  async searchRoom(
    @Query('limit') limit,
    @Query('offset') offset,
    @Query('hotel') hotel,
  ) {
    const rooms = await this.hotelRoomService.findRoom(hotel, limit, offset);

    if (rooms.length === 0) return [];

    if (rooms.length === 1) return rooms[0];

    return rooms;
  }

  @Get('/hotel-room/:id')
  async searchCurrentRoom(@Param() id) {
    const room = await this.hotelRoomService.findRoom(id);

    return room;
  }

  @Get('/support-requests/:id/messages')
  async searchHistorySupport(@Param() id) {
    const messages = await this.supportService.getMessages(id);
  }

  @Post('/support-requests/:id/message/read')
  async readMessages(
    @Body() createdBefore: Date,
    @Param() id: string,
    @Req() request,
  ) {
    if (!request.cookie.email) return 'error';

    const user = await this.userService.findByEmail(request.cookie.email);

    if (!user) return 'error';

    if (user.role === 'manager') {
      return await this.supportRequestEmployeeService.markMessagesAsRead({
        user: user.id,
        supportRequest: id,
        createdBefore: new Date(),
      });
    }

    if (user.role === 'client') {
      return await this.supportRequestClientService.markMessagesAsRead({
        user: user.id,
        supportRequest: id,
        createdBefore: new Date(),
      });
    }
  }
}
