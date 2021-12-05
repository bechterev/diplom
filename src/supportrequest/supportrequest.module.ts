import { Module } from '@nestjs/common';
import { SupportrequestService } from './supportrequest.service';
import { SupportrequestController } from './supportrequest.controller';

@Module({
  controllers: [SupportrequestController],
  providers: [SupportrequestService]
})
export class SupportrequestModule {}
