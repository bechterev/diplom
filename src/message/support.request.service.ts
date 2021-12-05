import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SendMessageDto } from './dto/send-message.dto';
import { MarkMessagesAsReadDto } from './dto/MarkMessagesAsRead.dto';
import { Message, MessageSchema } from './entities/message.entity';
import { ID } from 'src/types';
import { SupportRequest, SupportRequestSchema } from './entities/supportrequest.entity';

interface GetChatListParams {
  user: ID | null;
  isActive: boolean;
} 

interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void
  ): () => void;
}

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(@Inject(MessageSchema) private messageModel: Model<Message>,
  @Inject(SupportRequestSchema) private supportRequestModel:Model<SupportRequest>){}
  async findSupportRequests(params: any): Promise<any[]> {
    return await this.messageModel.find(params);
  }
  async sendMessage(data: SendMessageDto): Promise<Message> {
    return await this.messageModel.create(data);
  }
  async getMessages(supportRequest: ID): Promise<Message[]> {
    let request = await this.supportRequestModel.findOne({id:supportRequest});
    return request.messages;
  }
  subscribe(handler: (supportRequest: any, message: Message) => void): () => void {
    throw new Error('Method not implemented.');
  }
}
