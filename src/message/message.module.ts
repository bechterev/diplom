import { Module } from '@nestjs/common';
import { SupportRequestService } from './support.request.service';
import { MessageController } from './message.controller';
import { SupportRequestClientService } from './supportrequestclient/supportrequestclient.service';

@Module({
  controllers: [MessageController],
  providers: [SupportRequestService, SupportRequestClientService, ]
})
export class MessageModule {}
