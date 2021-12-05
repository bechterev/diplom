import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupportRequestService } from './support.request.service';
import { SendMessageDto } from './dto/send-message.dto';
import { MarkMessagesAsReadDto } from './dto/MarkMessagesAsRead.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: SupportRequestService) {}

  @Post()
  create(@Body() createMessageDto: SendMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: MarkMessagesAsReadDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
