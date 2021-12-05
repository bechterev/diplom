import { Inject, Injectable } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { ID } from 'src/types';
import { CreateSupportRequestDto} from '../dto/CreateSupportRequest.dto';
import { MarkMessagesAsReadDto } from '../dto/MarkMessagesAsRead.dto';
import { Message } from '../entities/message.entity';
import { SupportRequest, SupportRequestSchema } from '../entities/supportrequest.entity';

interface ISupportRequestClientService {
    createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
    markMessagesAsRead(params: MarkMessagesAsReadDto);
    getUnreadCount(supportRequest: ID): Promise<Message[]>;
  }
  
@Injectable()
export class SupportRequestClientService implements ISupportRequestClientService {
    constructor(@Inject(SupportRequestSchema) private SupportRequestModel:Model<SupportRequest>){}
    async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
        return await this.SupportRequestModel.create(data);
    }
    async markMessagesAsRead(params: MarkMessagesAsReadDto) {
        let Messages = await this.SupportRequestModel.updateMany
        ({user:params.user,createAt:{$gt:params.createdBefore},readyState:false},);
    }
    getUnreadCount(supportRequest: ID): Promise<Message[]> {
        throw new Error('Method not implemented.');
    }
}
