import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupportrequestService } from './supportrequest.service';
import { CreateSupportrequestDto } from './dto/create-supportrequest.dto';
import { UpdateSupportrequestDto } from './dto/update-supportrequest.dto';

@Controller('supportrequest')
export class SupportrequestController {
  constructor(private readonly supportrequestService: SupportrequestService) {}

  @Post()
  create(@Body() createSupportrequestDto: CreateSupportrequestDto) {
    return this.supportrequestService.create(createSupportrequestDto);
  }

  @Get()
  findAll() {
    return this.supportrequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportrequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupportrequestDto: UpdateSupportrequestDto) {
    return this.supportrequestService.update(+id, updateSupportrequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportrequestService.remove(+id);
  }
}
