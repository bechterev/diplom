import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Message } from 'src/message/entities/message.entity';
import { MessageService } from 'src/message/message/message.service';
import { ID } from 'src/types';
import { MarkMessagesAsReadDto } from '../dto/markMessagesAsRead.dto';
import { SupportRequest } from '../entities/supportrequest.entity';

interface ISupportRequestEmployeeService {
    markMessagesAsRead(params: MarkMessagesAsReadDto);
    getUnreadCount(supportRequest: ID): Promise<Message[]>;
    closeRequest(supportRequest: ID): Promise<void>;
  }

@Injectable()
export class SupportRequestEmployeeService implements ISupportRequestEmployeeService {
  constructor(@Inject() private SupportRequestModel:Model<SupportRequest>,
  private messageService: MessageService) {}
  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    let Messages = await this.SupportRequestModel.updateMany
    ({
        user: params.user.toString(),
        createAt: { $gt: params.createdBefore },
        isActive: false
    },
    { readAt: Date()},
    );
  }
  async getUnreadCount(supportRequest: ID): Promise<Message[]> {
    const Messages = await this.messageService.unreadMessage(supportRequest.toString(), true);
    return Messages;
  }
  async closeRequest(supportRequest: ID): Promise<void> {
    const closeRequests = await this.SupportRequestModel.updateOne(
      { _id: supportRequest.toString() },
      { isActive: false },
      );
  }

}