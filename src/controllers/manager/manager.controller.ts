import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ReservationService } from 'src/reservation/reservation.service';
import { MessageService } from '../../message/message/message.service';
import { UserService } from 'src/users/user/user.service';

@Controller('/api/manager')
export class ManagerController {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly userService: UserService,
        private readonly messageService: MessageService,
    ) {}

    @Get('/reservation/:userId')
    async getReservationUser(@Param() userId: string) {
        const listReservation = await this
        .reservationService.getReservations({
            user: userId,
            startDate: undefined,
            endDate: undefined,
        });
        return listReservation;
    }

    @Delete('/reservation/:userId/:reservationId')
    async deleteReservation(@Param() userId: string, @Param() reservationId: string) {
        await this.reservationService.deleteReservation(userId, reservationId);
    }

    @Get('/users/')
    async listUser(
        @Query() limit: number,
        @Query() offset: number,
        @Query() name: string,
        @Query() email: string,
        @Query() contactPhone: string,
    ) {
        const list = await this.userService.findAll(
            { limit, offset, name, email, contactPhone, },
        );
        return list.map((el) => {
            return {
                id: el.id,
                email: el.email,
                name: el.name,
                contactPhone: el.contactPhone,
            }
        })
    }

    @Get('/support-requests/')
    async searchHistorySupport(
        @Param() limit: number,
        @Param() offset: number,
        @Param() isActive: boolean,
        ) {
      const messages = await this.messageService.getAllMessages({offset, limit}, isActive);
      return messages;
    }
}
