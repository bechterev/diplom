import { Message } from 'src/message/entities/message.entity';
import { MessageService } from 'src/message/message/message.service';
import { SupportRequest, SupportRequestSchema } from '../entities/supportrequest.entity';
import { ID } from 'src/types';
import { CreateSupportRequestDto } from '../dto/createSupportRequest.dto';
import { MarkMessagesAsReadDto } from '../dto/markMessagesAsRead.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

interface ISupportRequestClientService {
    createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
    markMessagesAsRead(params: MarkMessagesAsReadDto);
    getUnreadCount(supportRequest: ID): Promise<Message[]>;
  }

@Injectable()
export class SupportRequestClientService implements ISupportRequestClientService {
    constructor(@Inject(SupportRequestSchema) private SupportRequestModel:Model<SupportRequest>,
    private messageService: MessageService){}

    async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
        return await this.SupportRequestModel.create(data);
    }

    async markMessagesAsRead(params: MarkMessagesAsReadDto) {
        let Messages = await this.SupportRequestModel.updateMany
        ({
            user: { $ne: params.user.toString() },
            createAt: { $gt: params.createdBefore },
            isActive: false,
        },
        { readAt: Date()},
        );
        return Messages;
    }
    async getUnreadCount(supportRequest: ID): Promise<Message[]> {
        const Messages = await this.messageService.unreadMessage(supportRequest.toString());
        return Messages;
    }
}