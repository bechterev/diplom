import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Message, MessageSchema } from '../entities/message.entity';

@Injectable()
export class MessageService {
  constructor(@Inject(MessageSchema) private messageModel: Model<Message>) {}

  public async unreadMessage(
    supportRequestID: string,
    employee: boolean = false,
  ): Promise<Message[]> {
    try {
      const Messages = await this.messageModel
        .find()
        .populate({
          path: 'SupportRequest',
          id: supportRequestID,
        })
        .populate({
          path: 'User',
          match: employee ? { role: 'manager' } : { role: { $ne: 'client' } },
        });

      return Messages;
    } catch (e) {
      return [];
    }
  }

  async getAllMessages(range: {offset: number, limit: number}, isActive?: boolean, user?: string) {
    const {offset, limit} = range;

    const filter: { [key: string]: any } = {};
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }
    if (user) filter.author = user;

    if (limit) {
      return await this.messageModel
        .find(filter)
        .populate({
          path: 'User',
          match: { role: 'client' },
        })
        .skip(offset)
        .limit(limit);
    } else {
      return await this.messageModel.find(filter).populate({
        path: 'User',
        match: { role: 'client' },
      });
    }
  }
}
